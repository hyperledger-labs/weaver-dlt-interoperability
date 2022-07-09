/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import eventsPb from "@hyperledger-labs/weaver-protos-js/common/events_pb";
import queryPb from '@hyperledger-labs/weaver-protos-js/common/query_pb';

import { LevelDBConnector } from "./dbConnector"

// Create connection to a database
const db = new LevelDBConnector("mydb")

async function addEventSubscription(
    eventSub: eventsPb.EventSubscription
): Promise<string> {
    console.log(`adding to driver, subscription of the eventSub: ${JSON.stringify(eventSub.toObject())}`);

    try {
        // eventMatcher need to be non-null, hence apply the NaN assertion operator '!'
        var eventMatcher: eventsPb.EventMatcher = eventSub.getEventmatcher()!;
        // the serialized protobuf for eventMatcher below can be decoded to other formats like 'utf8' [.toString('utf8')]
        const key: string = Buffer.from(eventMatcher.serializeBinary()).toString('base64');

        // query need to be non-null, hence apply the NaN assertion operator '!'
        var query: queryPb.Query = eventSub.getQuery()!;
        // the serialized protobuf for query below can be decoded to other formats like 'utf8' [.toString('utf8')]
        var querySerialized: string = Buffer.from(query.serializeBinary()).toString('base64');
        // serialized content of subscriptions is the value present in the key/value LevelDB corresponding to the key
        var subscriptions: Array<string>;

        try {
            // fetch the current values in the DB against the given key
            var subscriptionsSerialized: string = await db.read(key) as string;
            subscriptions = JSON.parse(subscriptionsSerialized);

            console.debug(`subscriptions.length: ${subscriptions.length}`);
            // check if the event to be subscribed is already present in the DB
            for (const subscriptionSerialized of subscriptions) {
                var subscription: queryPb.Query =  queryPb.Query.deserializeBinary(Buffer.from(subscriptionSerialized, 'base64'));
                if (subscription.getAddress() == query.getAddress() &&
                    subscription.getRequestingRelay() == query.getRequestingRelay() &&
                    subscription.getRequestingNetwork() == query.getRequestingNetwork() &&
                    subscription.getCertificate() == query.getCertificate() &&
                    subscription.getRequestorSignature() == query.getRequestorSignature() &&
                    subscription.getRequestingOrg() == query.getRequestingOrg() &&
                    subscription.getConfidential() == query.getConfidential()) {

                    console.log(`found subscription for query with requestId: ${subscription.getRequestId()}`);
                    return subscription.getRequestId();
                }
            }

            // case of key being present in the list
            console.debug(`eventMatcher: ${JSON.stringify(eventMatcher.toObject())} is already present in the database`);
            subscriptions.push(querySerialized);
        } catch (error: any) {
            let errorString = `${JSON.stringify(error)}`;
            if (errorString.includes('Error: NotFound:')) {
                // case of read failing due to key not found
                console.debug(`eventMatcher: ${JSON.stringify(eventMatcher.toObject())} is not present before in the database`);
                subscriptions = new Array<string>();
                subscriptions.push(querySerialized);
            } else {
                // case of read failing due to some other issue
                console.error(`re-throwing error: ${errorString}`);
                throw new Error(error);
            }
        }

        console.debug(`subscriptions.length: ${subscriptions.length}`);
        subscriptionsSerialized = JSON.stringify(subscriptions);
        // insert the value against key in the DB (it can be the scenario of a new key addition, or update to the value of an existing key)
        await db.insert(key, subscriptionsSerialized);

        // TODO: register the event with fabric sdk
        console.log(`end addEventSubscription() .. requestId: ${query.getRequestId()}`);
        return query.getRequestId();

    } catch(error: any) {
        console.error(`Error during addEventSubscription(): ${JSON.stringify(error)}`);
        throw new Error(error);
    }
}

const deleteEventSubscription = async (
    eventMatcher: eventsPb.EventMatcher,
    requestId: string
): Promise<eventsPb.EventSubscription> => {
    console.log(`deleting from driver subscription of the eventMatcher: ${JSON.stringify(eventMatcher.toObject())} with requestId: ${requestId}`);
    var subscriptions: Array<string>;
    var retVal: eventsPb.EventSubscription = new eventsPb.EventSubscription();
    retVal.setEventmatcher(eventMatcher);
    try {
        const key: string = Buffer.from(eventMatcher.serializeBinary()).toString('base64');
        try {
            // fetch the current values in the DB against the given key
            var subscriptionsSerialized: string = await db.read(key) as string;
            subscriptions = JSON.parse(subscriptionsSerialized);

            console.debug(`subscriptions.length: ${subscriptions.length}`);
            for (var subscriptionSerialized of subscriptions) {
                var subscription: queryPb.Query =  queryPb.Query.deserializeBinary(Buffer.from(subscriptionSerialized, 'base64'));
                if (subscription.getRequestId() == requestId) {
                    console.debug(`deleting the subscription (with input requestId): ${JSON.stringify(subscription.toObject())}`);
                    subscriptions.splice(subscriptions.indexOf(subscriptionSerialized), 1);
                    retVal.setQuery(subscription);
                    break;
                }
            }
        } catch (error: any) {
            // error could be either due to key not being present in the database or some other issue with database access
            console.error(`re-throwing error: ${JSON.stringify(error)}`);
            throw new Error(error);
        }

        console.debug(`subscriptions.length: ${subscriptions.length}`);
        if (subscriptions.length == 0) {
            await db.delete(key);
        } else {
            subscriptionsSerialized = JSON.stringify(subscriptions);
            await db.insert(key, subscriptionsSerialized);
        }

        console.log(`end deleteEventSubscription() .. retVal: ${JSON.stringify(retVal.toObject())}`);
        return retVal;
    } catch(error: any) {
        console.error(`Error during lookup: ${JSON.stringify(error)}`);
        throw new Error(error);
    }
}

async function lookupEventSubscriptions(
    eventMatcher: eventsPb.EventMatcher
): Promise<Array<queryPb.Query>> {
    console.info(`finding the subscriptions with eventMatcher: ${JSON.stringify(eventMatcher.toObject())}`);
    var subscriptions: Array<string>;
    var returnSubscriptions: Array<queryPb.Query> = new Array<queryPb.Query>();

    try {
        var eventMatcher: eventsPb.EventMatcher = eventMatcher;
        const key: string = Buffer.from(eventMatcher.serializeBinary()).toString('base64');

        // fetch the current values in the DB against the given key
        var subscriptionsSerialized: string = await db.read(key) as string;
        subscriptions = JSON.parse(subscriptionsSerialized)
        for (const subscriptionSerialized of subscriptions) {
            var subscription: queryPb.Query =  queryPb.Query.deserializeBinary(Buffer.from(subscriptionSerialized, 'base64'));
            console.debug(`subscription: ${JSON.stringify(subscription.toObject())}`)
            returnSubscriptions.push(subscription);
        }

        console.debug(`returnSubscriptions.length: ${returnSubscriptions.length}`);
        console.log(`end lookupEventSubscriptions()`);
        return returnSubscriptions;

    } catch (error: any) {
        let errorString: string = `${JSON.stringify(error)}`
        if (errorString.includes('Error: NotFound:')) {
            // case of read failing due to key not found
            returnSubscriptions = new Array<queryPb.Query>();
            console.debug(`returnSubscriptions.length: ${returnSubscriptions.length}`);
            return returnSubscriptions;
        } else {
            // case of read failing due to some other issue
            console.error(`Error during lookup: ${JSON.stringify(error)}`);
            throw new Error(error);
        }
    }
}

export {
    addEventSubscription,
    deleteEventSubscription,
    lookupEventSubscriptions
}