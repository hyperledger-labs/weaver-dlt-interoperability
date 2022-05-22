"use strict";(self.webpackChunkweaver_dlt_interoperability=self.webpackChunkweaver_dlt_interoperability||[]).push([[3299],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=i.createContext({}),p=function(e){var t=i.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return i.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,d=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,h=u["".concat(d,".").concat(m)]||u[m]||s[m]||r;return n?i.createElement(h,o(o({ref:t},c),{},{components:n})):i.createElement(h,o({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=u;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<r;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7219:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return d},default:function(){return u},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return c}});var i=n(7462),a=n(3366),r=(n(7294),n(3905)),o=["components"],l={id:"advanced-configuration",title:"Advanced Configuration"},d=void 0,p={unversionedId:"external/getting-started/test-network/advanced-configuration",id:"external/getting-started/test-network/advanced-configuration",isDocsHomePage:!1,title:"Advanced Configuration",description:"\x3c!--",source:"@site/docs/external/getting-started/test-network/advanced-configuration.md",sourceDirName:"external/getting-started/test-network",slug:"/external/getting-started/test-network/advanced-configuration",permalink:"/weaver-dlt-interoperability/docs/external/getting-started/test-network/advanced-configuration",editUrl:"https://github.com/hyperledger-labs/weaver-dlt-interoperability/edit/master/docs/external/getting-started/test-network/advanced-configuration.md",tags:[],version:"current",frontMatter:{id:"advanced-configuration",title:"Advanced Configuration"},sidebar:"Documentation",previous:{title:"Ledger Initialization",permalink:"/weaver-dlt-interoperability/docs/external/getting-started/test-network/ledger-initialization"},next:{title:"Testing Interoperation Modes",permalink:"/weaver-dlt-interoperability/docs/external/getting-started/interop/overview"}},c=[{value:"Corda",id:"corda",children:[{value:"Relay",id:"relay",children:[],level:3},{value:"Driver",id:"driver",children:[],level:3},{value:"Network",id:"network",children:[],level:3},{value:"Client Application",id:"client-application",children:[],level:3}],level:2},{value:"Fabric",id:"fabric",children:[{value:"Relay",id:"relay-1",children:[],level:3},{value:"Driver",id:"driver-1",children:[],level:3},{value:"Fabric CLI",id:"fabric-cli",children:[],level:3}],level:2}],s={toc:c};function u(e){var t=e.components,n=(0,a.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"You can configure the different components of the test network to use non-default parameter values for various settings (such as host names or port numbers). Here is a list of configurations you can tweak, classified by the DLT type."),(0,r.kt)("h2",{id:"corda"},"Corda"),(0,r.kt)("h3",{id:"relay"},"Relay"),(0,r.kt)("p",null,"To run the relay on a different port from the default (",(0,r.kt)("inlineCode",{parentName:"p"},"9081"),"), do the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Navigate to the ",(0,r.kt)("inlineCode",{parentName:"li"},"core/relay")," folder."),(0,r.kt)("li",{parentName:"ul"},"Update the ",(0,r.kt)("inlineCode",{parentName:"li"},"port")," field in ",(0,r.kt)("inlineCode",{parentName:"li"},"config/Corda_Relay.toml"),"."),(0,r.kt)("li",{parentName:"ul"},"To ensure that the relay of ",(0,r.kt)("inlineCode",{parentName:"li"},"network1")," can communicate with this relay, update the ",(0,r.kt)("inlineCode",{parentName:"li"},"port")," field in the ",(0,r.kt)("inlineCode",{parentName:"li"},"relays.Corda_Relay")," section in ",(0,r.kt)("inlineCode",{parentName:"li"},"config/Fabric_Relay.toml")," with the same value."),(0,r.kt)("li",{parentName:"ul"},"To ensure that the relay of ",(0,r.kt)("inlineCode",{parentName:"li"},"network2")," can communicate with this relay, update the ",(0,r.kt)("inlineCode",{parentName:"li"},"port")," field in the ",(0,r.kt)("inlineCode",{parentName:"li"},"relays.Corda_Relay")," section in ",(0,r.kt)("inlineCode",{parentName:"li"},"config/Fabric_Relay2.toml")," with the same value."),(0,r.kt)("li",{parentName:"ul"},"(You can update host names in similar locations, by adjusting the ",(0,r.kt)("inlineCode",{parentName:"li"},"hostname")," field.)"),(0,r.kt)("li",{parentName:"ul"},"When you attempt a Fabric to Corda interoperation flow, use the new host name or port (instead of ",(0,r.kt)("inlineCode",{parentName:"li"},"localhost:9081"),").")),(0,r.kt)("h3",{id:"driver"},"Driver"),(0,r.kt)("p",null,"To run the driver on a different port from the default (",(0,r.kt)("inlineCode",{parentName:"p"},"9099"),"), do the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Navigate to the ",(0,r.kt)("inlineCode",{parentName:"li"},"core/drivers/corda-driver")," folder."),(0,r.kt)("li",{parentName:"ul"},"Set the environment variable ",(0,r.kt)("inlineCode",{parentName:"li"},"DRIVER_PORT")," appropriately while running the executable as follows:",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"DRIVER_PORT=<port> ./build/install/corda-driver/bin/corda-driver\n")))),(0,r.kt)("p",null,"To ensure that the relay can connect to this driver:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Navigate to the ",(0,r.kt)("inlineCode",{parentName:"li"},"core/relay")," folder."),(0,r.kt)("li",{parentName:"ul"},"Update the ",(0,r.kt)("inlineCode",{parentName:"li"},"port")," field in the ",(0,r.kt)("inlineCode",{parentName:"li"},"drivers.Corda")," section in ",(0,r.kt)("inlineCode",{parentName:"li"},"config/Corda_Relay.toml")," with the same value.")),(0,r.kt)("h3",{id:"network"},"Network"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Notes"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"In our sample setup, all the Corda nodes must be running on the same machine (",(0,r.kt)("inlineCode",{parentName:"td"},"localhost")," or some other) for seamless communication.")))),(0,r.kt)("p",null,"To change the ports the Corda nodes are listening on, do the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Navigate to the ",(0,r.kt)("inlineCode",{parentName:"li"},"tests/network-setups/corda")," folder."),(0,r.kt)("li",{parentName:"ul"},"Update the exposed ports in ",(0,r.kt)("inlineCode",{parentName:"li"},"docker-compose.yml")," (defaults are ",(0,r.kt)("inlineCode",{parentName:"li"},"10003")," for the ",(0,r.kt)("inlineCode",{parentName:"li"},"notary")," container and ",(0,r.kt)("inlineCode",{parentName:"li"},"10006")," for the ",(0,r.kt)("inlineCode",{parentName:"li"},"partya")," container)."),(0,r.kt)("li",{parentName:"ul"},"Navigate to the ",(0,r.kt)("inlineCode",{parentName:"li"},"samples/corda/corda-simple-application")," folder."),(0,r.kt)("li",{parentName:"ul"},"Update the ",(0,r.kt)("inlineCode",{parentName:"li"},"CORDA_HOST")," (default is ",(0,r.kt)("inlineCode",{parentName:"li"},"localhost"),") and ",(0,r.kt)("inlineCode",{parentName:"li"},"CORDA_PORT")," (default is ",(0,r.kt)("inlineCode",{parentName:"li"},"10006"),") environment variables on your host machine to reflect the above update, or run the client bootstrapping script as follows:",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"CORDA_HOST=<hostname> CORDA_PORT=<port> make initialise-vault\n"))),(0,r.kt)("li",{parentName:"ul"},"When you attempt a Fabric to Corda interoperation flow, use the new host name and port values as in the following example (",(0,r.kt)("inlineCode",{parentName:"li"},"network1")," requesting ",(0,r.kt)("inlineCode",{parentName:"li"},"Corda_Network"),"):",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./bin/fabric-cli interop --local-network=network1 --requesting-org=org1.network1.com localhost:9081/Corda_Network/<CORDA_HOST>:<CORDA_PORT>#com.cordaSimpleApplication.flow.GetStateByKey:H`\n")))),(0,r.kt)("h3",{id:"client-application"},"Client Application"),(0,r.kt)("p",null,"The config files used to initialise the network's verification policies, access control policies, and security group info, contain the address (host name and port) of the Corda node.\nTo update the address of the Corda node, do the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Navigate to the ",(0,r.kt)("inlineCode",{parentName:"li"},"samples/corda/corda-simple-application")," folder."),(0,r.kt)("li",{parentName:"ul"},"Edit the ",(0,r.kt)("inlineCode",{parentName:"li"},"rules --\x3e resource")," field in line 7 in ",(0,r.kt)("inlineCode",{parentName:"li"},"clients/src/main/resources/config/FabricNetworkAccessControlPolicy.json")," by replacing ",(0,r.kt)("inlineCode",{parentName:"li"},"localhost:10006")," with ",(0,r.kt)("inlineCode",{parentName:"li"},"<CORDA_HOST>:<CORDA_PORT>")," as specified in the previous section.")),(0,r.kt)("h2",{id:"fabric"},"Fabric"),(0,r.kt)("h3",{id:"relay-1"},"Relay"),(0,r.kt)("p",null,"To run the relay on a different port from the default (",(0,r.kt)("inlineCode",{parentName:"p"},"9080")," for ",(0,r.kt)("inlineCode",{parentName:"p"},"network1")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"9083")," for ",(0,r.kt)("inlineCode",{parentName:"p"},"network2"),"), do the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Navigate to the ",(0,r.kt)("inlineCode",{parentName:"li"},"core/relay")," folder."),(0,r.kt)("li",{parentName:"ul"},"Update the ",(0,r.kt)("inlineCode",{parentName:"li"},"port")," field in ",(0,r.kt)("inlineCode",{parentName:"li"},"config/Fabric_Relay.toml")," (for ",(0,r.kt)("inlineCode",{parentName:"li"},"network1"),") or ",(0,r.kt)("inlineCode",{parentName:"li"},"config/Fabric_Relay2.toml")," (for ",(0,r.kt)("inlineCode",{parentName:"li"},"network2"),")."),(0,r.kt)("li",{parentName:"ul"},"To ensure Fabric-Fabric relay communication, update the foreign relay port in the ",(0,r.kt)("inlineCode",{parentName:"li"},"port")," field in the ",(0,r.kt)("inlineCode",{parentName:"li"},"relays.Fabric_Relay")," section in either of the above files."),(0,r.kt)("li",{parentName:"ul"},"To ensure that the Corda network's relay can communicate with this relay, update the ",(0,r.kt)("inlineCode",{parentName:"li"},"port")," field in the ",(0,r.kt)("inlineCode",{parentName:"li"},"relays.Fabric_Relay")," section in ",(0,r.kt)("inlineCode",{parentName:"li"},"config/Corda_Relay.toml"),"."),(0,r.kt)("li",{parentName:"ul"},"(You can update host names in similar locations, by adjusting the ",(0,r.kt)("inlineCode",{parentName:"li"},"hostname")," field.)"),(0,r.kt)("li",{parentName:"ul"},"When you attempt a Fabric to Fabric or Corda to Fabric interoperation flow, use the new host name or port (instead of ",(0,r.kt)("inlineCode",{parentName:"li"},"localhost:9081")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"localhost:9083"),")."),(0,r.kt)("li",{parentName:"ul"},"Navigate to the ",(0,r.kt)("inlineCode",{parentName:"li"},"core/drivers/fabric-driver")," folder."),(0,r.kt)("li",{parentName:"ul"},"Update the ",(0,r.kt)("inlineCode",{parentName:"li"},"RELAY_ENDPOINT")," variable in ",(0,r.kt)("inlineCode",{parentName:"li"},".env")," or specify ",(0,r.kt)("inlineCode",{parentName:"li"},"RELAY_ENDPOINT=<hostname>:<port>")," in the command line while running the driver using ",(0,r.kt)("inlineCode",{parentName:"li"},"npm run dev"),"."),(0,r.kt)("li",{parentName:"ul"},"Navigate to the ",(0,r.kt)("inlineCode",{parentName:"li"},"samples/fabric/fabric-cli")," folder."),(0,r.kt)("li",{parentName:"ul"},"Update the ",(0,r.kt)("inlineCode",{parentName:"li"},"relayEndpoint")," variables appropriately.")),(0,r.kt)("h3",{id:"driver-1"},"Driver"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"fabric-driver")," configuration can be controlled by environment variables either set in ",(0,r.kt)("inlineCode",{parentName:"p"},".env")," in the ",(0,r.kt)("inlineCode",{parentName:"p"},"core/drivers/fabric-driver")," folder (or a copy if you created one) or passed in the command line when you run ",(0,r.kt)("inlineCode",{parentName:"p"},"npm run dev")," to start the driver. The relevant variables you can control when you make any change to the setup are:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"CONNECTION_PROFILE"),": this is the path to the connection profile. If you make changes to the network or use a different one, create a new connection profile and point to it using this variable."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"RELAY_ENDPOINT"),": this is the endpoint of the relay (hostname and port), and you can adjust it as described in the previous section; this is where the relay will be listening for incoming requests and from where the relay will channel foreign requests as well."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"DRIVER_ENDPOINT"),": this is the hostname and port the driver itself will bind to, and you can change it from the default (",(0,r.kt)("inlineCode",{parentName:"li"},"localhost:9090")," for ",(0,r.kt)("inlineCode",{parentName:"li"},"network1")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"localhost:9095")," for ",(0,r.kt)("inlineCode",{parentName:"li"},"network2"),") as per your need")),(0,r.kt)("h3",{id:"fabric-cli"},"Fabric CLI"),(0,r.kt)("p",null,"You can adjust settings for ",(0,r.kt)("inlineCode",{parentName:"p"},"fabric-cli")," in the ",(0,r.kt)("inlineCode",{parentName:"p"},".env")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"config.json")," (in the ",(0,r.kt)("inlineCode",{parentName:"p"},"samples/fabric/fabric-cli")," folder) as described earlier."),(0,r.kt)("p",null,"Important environment variables (in ",(0,r.kt)("inlineCode",{parentName:"p"},".env"),") are:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"DEFAULT_CHANNEL"),": this is the name of the channel the CLI will interact with. If you build a new channel or network, update the channel name here."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"DEFAULT_CHAINCODE"),": this is the name of the interoperaton chaincode the CLI will submit transactions and queries to for policy and security group bootstrapping. If you wish to test with a modified interoperation chaincode with a different name, update this value."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"MEMBER_CREDENTIAL_FOLDER"),": as described earlier, this is an absolute path that points to policies and security group info associated with foreign networks. You can adjust this info for the existing three networks or add credentials for another network you wish to test interoperation flows with."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"LOCAL"),": this is a boolean, indicating whether the network to connect to is running on (and as) ",(0,r.kt)("inlineCode",{parentName:"li"},"localhost")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"DEFAULT_APPLICATION_CHAINCODE"),": this is the name of the application chaincode which maintains information that can be shared (with proof) with other networks upon request using interoperation. You may write and deploy your own chaincode and use its name here instead of the default ",(0,r.kt)("inlineCode",{parentName:"li"},"simplestate"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"CONFIG_PATH"),": this points to the JSON file containing the configurations of all the Fabric networks that need to be configured using the ",(0,r.kt)("inlineCode",{parentName:"li"},"fabric-cli"),".")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"config.json")," (which can have a different name as long as you add the right reference to ",(0,r.kt)("inlineCode",{parentName:"p"},".env")," and configure ",(0,r.kt)("inlineCode",{parentName:"p"},"fabric-cli")," suitably) has the following structure (it can have any number of networks specified):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'{\n  "network1": {\n    "connProfilePath": "",\n    "relayEndpoint": ""\n  },\n  "network2": {\n    "connProfilePath": "",\n    "relayEndpoint": ""\n  }\n}\n\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"connProfilePath"),": absolute path of the network's connection profile"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"relayEndpoint"),": hostname and port of the particular network's relay (make sure you sync this with any changes made to that relay's configuration)")))}u.isMDXComponent=!0}}]);