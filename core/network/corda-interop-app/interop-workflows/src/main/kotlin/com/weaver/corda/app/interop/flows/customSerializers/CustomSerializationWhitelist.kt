/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

package com.weaver.corda.app.interop.flows.customSerializers

import arrow.core.Either
import net.corda.core.serialization.SerializationWhitelist

/**
 * The CustomSerializationAllowlist class is used to define classes that should be
 * serializable by the Corda's wire protocol (based on AMQP 1.0).
 *
 * It extends the interface and therefore overrides the
 * property. This method of specifying allowlisted classes is need for the classes defined
 * here because they are from a third party library and therefore cannot be modified to
 * include the @CordaSerializable annotation, which is otherwise the preferred method for
 * allowlisting.
 *
 * @property The list of classes that are allowlisted for serialization.
 */
class CustomSerializationAllowlist : SerializationWhitelist {
    override val whitelist: List<Class<*>> = listOf(
            Either::class.java,
            Either.Right::class.java,
            Either.Left::class.java
            )
}