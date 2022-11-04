import { Endorser, EventInfo } from 'fabric-common';
import { CommitEvent } from '../../events';
export declare function newCommitEvent(peer: Endorser, eventInfo: EventInfo): CommitEvent;
