"use strict";(self.webpackChunkweaver_dlt_interoperability=self.webpackChunkweaver_dlt_interoperability||[]).push([[830],{9926:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"cross-chain-asset","metadata":{"permalink":"/weaver-dlt-interoperability/blog/2021/01/21/cross-chain-asset","source":"@site/blog/2021-01-21-cross-chain-asset.md","title":"cross-chain-asset","description":"\x3c!--","date":"2021-01-21T00:00:00.000Z","formattedDate":"January 21, 2021","tags":[],"readingTime":10.435,"truncated":false,"authors":[],"nextItem":{"title":"emergence-enterprise-interoperability","permalink":"/weaver-dlt-interoperability/blog/2021/01/21/emergence-enterprise-interoperability"}},"content":"\x3c!--\\n Copyright IBM Corp. All Rights Reserved.\\n\\n SPDX-License-Identifier: CC-BY-4.0\\n --\x3e\\n---\\nslug: cross-chain-asset\\ntitle: Enabling Cross-Chain Asset Exchange On Permissioned Blockchains\\nauthor: Yining Hu, Ermyas Abebe, Dileban Karunamoorthy, Venkatraman Ramakrishna\\nauthor_title: Contributors\\nauthor_url: https://hyperledger-labs.github.io/weaver-dlt-interoperability/\\ntags: [enterprise, interoperability, asset-exchange]\\n---\\n## Introduction\\nRecent years have witnessed a growing demand for enabling interoperability across independent blockchains. Cross-chain asset exchange is a significant step towards blockchain interoperability. For public blockchains, the most popular application for asset exchange is cryptocurrency exchange. For permissioned blockchains, cross-chain asset exchange can be useful in [Delivery Versus Payment (DvP)](https://www.mas.gov.sg/-/media/MAS/ProjectUbin/Project-Ubin-DvP-on-Distributed-Ledger-Technologies.pdf) and [cross-border payment](https://www.mas.gov.sg/-/media/Jasper-Ubin-Design-Paper.pdf) scenarios. There exist various protocols designed for asset exchange on public blockchains. However, a widely adopted standard for designing such protocols for permissioned blockchains still does not exist. Moreover, most existing protocols are designed for public blockchains and their suitability to be applied to permissioned blockchains is unclear.\\n\\nIn this article, we aim to lay out a set of requirements for designing cross-chain asset exchange protocols between permissioned blockchains. First we present a canonical motivating use case and then list the various patterns that such cases will follow in real-life scenarios. We then present a short survey of existing cross-chain exchange protocols for public blockchains, following which we summarise the building blocks, core mechanisms and security properties commonly involved in the protocol designs. We then analyse the requirements imposed by permissioned blockchains in comparison to public blockchains, and discuss the additional properties with respect to these restrictions.\\n\\n## Motivation and Use-case\\nIn traditional financial markets parties trade assets such as securities and derivatives for cash or other assets. To reduce risk, various clearing and settlement processes and intermediaries are often involved. One form of settlement is a DvP where the transfer of securities is performed only in the event of a corresponding payment. This arrangement reduces principal risk by ensuring that both parties receive their end of the exchange. However, settlement in financial markets are slow and time consuming. It also involves counterparty risks and requires intermediaries.\\n\\nOver the past few years, we have been seeing significant efforts in digitising and tokenising both currencies and securities on Distributed Ledger Technology (DLT) infrastructures. On the one hand we have seen concerted efforts around Central Bank Digital Currencies (CBDC) being added to the landscape of other blockchain based payment networks. On the other hand, we have also seen efforts such as that from the Australian Stock Exchange (ASX) to replace its current settlement system--Clearing House Electronic Subregister System (CHESS) with a DLT based platform by 2021.\\n\\nAgainst this backdrop, a number of central banks have been exploring the potential of performing DvP settlement across a currency ledger and a securities ledger. In this article, we use this as a motivating use-case for our discussions. The scenario involves two decentralised ledgers, namely, a currency ledger and a securities ledger, based on different DLT protocols performing a coordinated transfer of assets in their respective ledgers. Figure 1 depicts this scenario in the context of two organisations--Bank A and Bank B--in which Bank B wants to purchase some securities owned by Bank A and both organisations have accounts on both ledgers. To effect this exchange the following two transactions will have to happen atomically across both networks: i) transfer of payment from Bank B\'s currency account to Bank A while at the same time ii) the entitlements of the designated securities is transferred from Bank A to Bank B. The scenario would need to guarantee that after the transaction execution, either both parties have their end of the exchange or neither does and that this exchange is performed in a timely manner. \\n\\n![alt text](/simple-dvp.png)\\n\\nFigure 1. A typical DvP use-case.\\n\\nCross-chain transactions involving the movement of assets can generally take the form of either an asset exchange between parties or of value transfer from one network to another. The latter involves a scenario in which an asset in one network is locked or burned and a corresponding asset of similar value is issued in a corresponding network. This process generally involves validators or asset issuers in either or both ends of the network. While there are numerous use cases for this model in permissionless context, in this post we primarily focus on asset exchange scenarios, which are more broadly applicable in enterprise use-cases. Asset exchange scenarios generally involve two users swapping corresponding assets managed by the different networks, as in the example illustrated earlier. In asset exchange scenarios involving only two parties, both parties have accounts on both networks, although this might not be the case for exchanges involving more than two parties or networks.\\n\\n## Cross-Chain Asset Exchange on Public Blockchains\\nSimilar scenarios that involve a pair of transactions being coordinated across distinct blockchains have been studied for public blockchains. One main application area is to enable decentralised exchange across crypto-currency networks. To achieve this, a number of cross-chain asset exchange protocols have been proposed. The original atomic swap protocol was proposed by [TierNolan](https://en.bitcoin.it/wiki/Atomic_swap) in the Bitcoin Forum. The protocol leverages trusted escrow services on both blockchains and relies on the asset owners for execution. [Prestwich](https://summa.one/) later improved the protocol by removing the trusted escrow services and using a smart contract to automatically execute the swap. Both protocols, however, are asymmetric and hence enforce a particular sequence of events. More recently, a group of researchers developed [Arwen](https://arwen.io/whitepaper.pdf), which guarantees the symmetricality of the protocol and further eases the asset owners\' responsibilities in the protocol execution. \\n\\nWe below first discuss the common patterns involved in the protocol design. More specifically, we present the main building blocks, core mechanisms, and security properties achieved by these protocols. \\n\\n# Building blocks\\nThe design of a cross-chain asset exchange protocol in general contain the following building blocks: 1) the infrastructure for cross-chain state verification, and 2) the asset exchange protocol that specifies parties and sequences involved in the protocol execution. Cross-chain state verification can be performed by the exchanging parties themselves or by an external party.\\n\\n# Core Mechanisms\\n* Fund locking: To initialise an asset exchange, it is common for one or both parties to first lock up funds with a fund-withholding party on his or her own blockchain. Temporary fund locking ensures the locked fund cannot be used for other purposes while the exchange is being executed. This scheme is often used with a specified timeout to provide flexibility for reclaiming locked funds if the exchange does not take place.\\n\\n* Fund redeeming: In general, the execution requires a pair of transactions to occur on both blockchains, e.g., from User A to User B on Chain A and from User B to User A on Chain B. When certain conditions are met, the locked funds can be redeemed by, or paid to the respective users. The execution of the exchange can be carried out by users themselves, or through other trusted third parties. These trusted third parties can be stand-alone parties that are not otherwise involved in both blockchains, or part of either blockchain. \\n\\n* Refund: For protocols that are initialised with a temporary fund-locking, the locked funds can usually be reclaimed by the initial owner after a specified timeout. \\n\\n# Security Properties\\n* Atomicity: Atomicity is also sometimes referred to as safety. In general, atomicity implies indivisibility and irreducibility, namely, an atomic operation must be performed entirely or not performed at all. In the case of cross-chain asset exchange, when User A sends a payment to User B on Chain A, User B should also send corresponding delivery to User A on Chain B.\\n\\n* Liveness: Specifies the design of an asset exchange protocol should ensure no party can be tricked into locking up funds forever or for a very long time.\\n\\n## Extending Protocol Design To Permissioned Blockchains\\nRequirements of Permissioned Blockchains\\nAs public blockchains offer decentralisation and transparency, existing cross-chain asset exchange protocols on public blockchains are often designed for users to voluntarily participant and execute. To ensure secure execution of these protocols, their designs usually incorporate economic incentives, together with on-chain punishment schemes. To ensure liveness, these protocols usually leverage group consensus and fault-tolerance.\\n\\nPermissioned blockchains on the other hand require privacy. Additional economic incentives and punishments are often not required besides the existing business relationships and established legal jurisdictions. Therefore, compared to public blockchains, the design of cross-chain asset exchange protocols on permissioned blockchains allows a higher level of centralisation and requires auditability and individual or group accountability for off-chain dispute resolution rather than economic incentives and on-chain punishments. Moreover, as permissioned blockchains themselves offer a higher throughput and faster transaction processing than public blockchains, the asset exchange protocol ideally should not introduce significant processing overheads that limit the transaction processing capability.\\n\\nTherefore, the challenges in designing cross-chain asset exchange protocols for permissioned networks can be summarised as follow:\\n* Permissioned networks are usually confidential by design, thus restricting access for its internal members and external clients. State verification is hard to achieve across distinct permissioned blockchains. Cross-chain asset exchange protocols must therefore incorporate additional mechanisms to overcome these challenges.\\n* Unlike public blockchains, permissioned blockchains derive their security from and the ability to hold parties accountable for their actions. Any party acting maliciously should be identified and penalized during an off-chain dispute resolution process. Thus we can relax some of the constraints of the exchange protocol. For example, we can leverage trusted third-parties instead of having to financially incentivise regular users to participate in running the protocol.\\n\\n# Additional Properties\\nIn addition to following the same set of building blocks, core mechanisms and security properties as public protocols, we also identify an additional set of desired properties for permissioned blockchains.\\n\\n* Scalability: Scalability is often restricted by two factors. Firstly, the transaction processing capability of the underlying infrastructures. When a protocol relies on public blockchains, the throughput is consequently limited by the transaction processing of the blockchains themselves. In contrast, some protocols are off-chain, which usually allow faster transaction processing. Secondly, for protocols that involve third parties for fund-locking, such as [Xclaim](https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8835387) and [Dogethereum](https://arxiv.org/pdf/1908.03999.pdf), the amount of money owned by these third parties limits the number of transaction requests they can process. As permissioned blockchains in general have a higher throughput compared to public blockchains, the protocol design should not trade off scalability.\\n\\n* Auditability: Auditability for public blockchains specifies that any party with read right should be able to detect protocol failure. On permissioned blockchains, however, as parties have limited visibility over the ledger state, who can detect protocol failure will most-likely depend on the use-case. In addition, financial regulatory requirements such as AML and CTF might require cross-chain traceability and auditability of exchange transactions (i.e. it should be easy to trace why Alice just transferred Bob $1M on a CBDC network).\\n\\n* Accountability: Accountability says faulty parties should be held accountable. This can refer to individual accountability or group accountability. As it is hard to enforce on-chain punishments on permissioned blockchains, the protocol design should at least allow adversaries to be held accountable.\\n\\n* Compatibility: Compatibility specifies how easy it is to implement the protocol on other blockchain platforms. The protocol design should be generic and not to be limited to particular blockchain platforms.\\n\\n* Extensibility: Extensibility specifies how easy it is to extend the protocol to other use cases, for instance, from two parties to multiple parties, or from one particular transaction pattern to other transaction patterns. \\n\\n* Privacy: Privacy is usually not automatically guaranteed by public blockchains. For sensitive use-cases, extra mechanisms such as a [trusted execution environment (TEE)](https://dl.acm.org/doi/pdf/10.1145/3319535.3363221?casa_token=_CXTS4E4hVsAAAAA:9YXRV8SUF7ljmdn2iovE1la3_j6Yn7O1oKqrdZZwxrO_u_Dg2sRqjYdVcTUCLFayNd-s8AWZfELaKA) can be used. Privacy is also of vital importance when it comes to permissioned blockchains. Most existing cross-chain protocols are designed for public blockchains. As the execution of these protocols may require asset owners or third-parties to access states on either blockchain ledger, executing a cross-chain asset exchange can put user privacy at risk.\\n\\n* Low Cost: As many of the cross-chain exchange protocols involve sending on-chain transactions, the concern over number of transactions and transaction fees arises when the protocol design involves a public blockchain.\\n\\n## Conclusion\\nTo summarise, in this article we tackle the problem of enabling cross-chain asset exchange on permissioned blockchains and evaluate the different requirements imposed by public blockchains and permissioned blockchains. We also articulate a set of desired properties to guide the design of cross-chain asset exchange protocols.\\n\\nFor general-purpose interoperability of enterprise blockchains, we have developed the [Weaver](https://hyperledger-labs.github.io/weaver-dlt-interoperability/) tool that incorporates a cross-chain state verification engine to enable cross-chain state sharing and verification. Please check out our documentation for implementation details and example applications."},{"id":"emergence-enterprise-interoperability","metadata":{"permalink":"/weaver-dlt-interoperability/blog/2021/01/21/emergence-enterprise-interoperability","source":"@site/blog/2021-01-21-emergence-enterprise-interoperability.md","title":"emergence-enterprise-interoperability","description":"\x3c!--","date":"2021-01-21T00:00:00.000Z","formattedDate":"January 21, 2021","tags":[],"readingTime":4.945,"truncated":false,"authors":[],"prevItem":{"title":"cross-chain-asset","permalink":"/weaver-dlt-interoperability/blog/2021/01/21/cross-chain-asset"}},"content":"\x3c!--\\n Copyright IBM Corp. All Rights Reserved.\\n\\n SPDX-License-Identifier: CC-BY-4.0\\n --\x3e\\n---\\nslug: emergence-enterprise-interoperability\\ntitle: Emergence of Enterprise DLT Interoperability\\nauthor: Venkatraman Ramakrishna\\nauthor_title: Maintainer of Weaver\\nauthor_url: https://github.com/VRamakrishna\\nauthor_image_url: https://avatars2.githubusercontent.com/u/14888211?s=400&v=4\\ntags: [enterprise, interoperability]\\n---\\n\\nIt is instructive to know the course taken by blockchain technology and its applications over the past few years, as this will allow us to understand where we are, where are headed, and thereby motivate the necessity of interoperability.\\n\\n## The Grand Vision\\nThe original vision of blockchain technology called for a global decentralized network of peers and clients that could conduct transactions at scale without requiring intermediation by trusted third parties. The Bitcoin network was the first example of this, and it was purposely left open for anyone to join precisely because its initiators hoped for a single global network somewhat akin to the internet.\\n\\nBut the limitations of Bitcoin as a transaction processing system soon became apparent, and the Ethereum network emerged to fill this gap, retaining the openness and scalability of Bitcoin while supporting arbitrary smart contracts over a shared ledger. But Ethereum too was not destined to be the single canonical global blockchain network that everyone would use.\\n\\nSub-groups within the Bitcoin and Ethereum communities dissented from the rest, thereby creating _forks_, or separate networks with separate chains of blocks. Others found limitations in the usability of the existing networks or their consensus mechanisms (Proof of Work) and decided to build their own networks to which like-minded people could subscribe and in which they could conduct their transactions.\\n\\nTherefore, the original Bitcoin (or even Ethereum) vision of a single global network was not to be, and networks with different clientele and different consensus protocols proliferated.\\n\\nAnd then came private (or permissioned) networks......\\n\\n## Evolution of Private Networks\\nSometime in the first half of the previous decade, it was recognized that networks like Bitcoin and Ethereum were not suitable for much of the business that involves private enterprises, governmental institutions, and ordinary clients. Private networks then emerged as a means to retain the trustworthiness and consensus-based decision-making properties of blockchains (and distributed ledgers in general) while ensuring that:\\n- Transactions and ledger state are privy only to a selected set of entities,\\n- Transactions can be audited by trusted authorities when required for dispute resolutions, and\\n- Higher performance and assurance can be gained using consensus protocols other than _proof-of-work_.\\n\\nSince companies and consortia were wary of this new and unproven technology, the trend in industry these past few years has been to build _minimum viable ecosystems_, i.e., networks of limited operational scope and participation. The goal being to evaluate the potential of blockchain, these networks were created to manage selected few assets and records. Needless to say, interoperation with other networks was not high on the priority list when such networks were designed and launched.\\n\\nMany of these networks have been successfully validated and put into production. But a consequence of the decision to build limited-scope networks is that the processes they run (through smart contracts) and the assets and records they maintain on their ledgers are stuck in siloes, inaccessible to external entitites and networks. Yet, as we are discovering, processes and assets in such networks are inextricably linked in the real enterprise world. With all of the investment (in time and money) made in existing networks, reeingeneering or merging them will generally be hardsells. Also, some networks may wish to restrict operational control and ledger visibility to its current set of administrators and clientele. The only viable solution is to allow networks to interoperate, thereby breaking up the siloes, while retaining operational control.\\n\\n## Diverse Platforms\\nOur present blockchain landscape (or ecosystem) is characterized not just by a plethora of networks, a mix of open and private, but also by the existence of several distinct blockchain technologies, each with a different storage technology, a different model for contracts and client applications, a different consensus protocol, and a different way of managing identity. Examples include Fabric, Iroha, Sawtooth, and Besu, all in the Hyperledger family, and Ethereum, Multichain, Cardano, and Komodo, outside it. There are also smart contract distributed ledger platforms that serve a similar set of business applications that are not blockchains at all, like R3\'s Corda.\\n\\nSince there is no single blockchain, or distributed ledger, technology, the world agrees on, and because each offers a different set of advantages and disadvantages, the networks that exist today are built on a diverse set of such platforms.\\n\\n## Blockchain Landscape\\nOur present is, and our near future will be, characterized by the existence of independent networks, some of which offer open membership whereas others are restricted, built on diverse platforms that are mutually incompatible. Asking everyone to converge to a single global network running on a single canonical platform is almost impossible. So unless we wish entities and assets to remain trapped within siloes, it should be evident that interoperability amoong different networks and platforms is crucial to the success of blockchain.\\n\\n## Challenges\\n\\nInterlinking processes distributed across different networks or transferring or sharing assets and data may sound like a straightforward task, but the traditional method of service and API integration will not work in scenarios that involve permissioned networks.\\n\\nThis is because, as you will see in the [user stories](/docs/external/user-stories/overview), entities that are interested in the asset or data record being shared may not be members of both networks. And even if a particular entity happens to be a member of both networks, it may be in its interest to present a false view of one network\'s ledger state to another.\\n\\nTherefore, interoperation cannot be allowed to hinge on the trustworthiness of a particular network member, or by extension, a third party. In the stories we will encounter, it will be apparent how such situations may occur. This will make the unreliability of API integration across private networks clear and also motivate the need for consensus-based interoperation protocols."}]}')}}]);