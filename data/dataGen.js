/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const ccfRankList =
  "A	TOCS	ACM Transactions on Computer Systems	/journals/tocs	/journals/tocs/tocs\n" +
  "A	TOS	ACM Transactions on Storage	/journals/tos	/journals/tos/tos\n" +
  "A	TCAD	IEEE Transactions On Computer-Aided Design Of Integrated Circuits And System	/journals/tcad	/journals/tcad/tcad\n" +
  "A	TC	IEEE Transactions on Computers	/journals/tc	/journals/tc/tc\n" +
  "A	TPDS	IEEE Transactions on Parallel and Distributed Systems	/journals/tpds	/journals/tpds/tpds\n" +
  "A	TACO	ACM Transactions on Architecture and Code Optimization	/journals/taco	/journals/taco/taco\n" +
  "B	TAAS	ACM Transactions on Autonomous and Adaptive Systems	/journals/taas	/journals/taas/taas\n" +
  "B	TODAES	ACM Transactions on Design Automation of Electronic Systems	/journals/todaes	/journals/todaes/todaes\n" +
  "B	TECS	ACM Transactions on Embedded Computing Systems	/journals/tecs	/journals/tecs/tecs\n" +
  "B	TRETS	ACM Transactions on Reconfigurable Technology and Systems	/journals/trets	/journals/trets/trets\n" +
  "B	TVLSI	IEEE Transactions on Very Large Scale Integration (VLSI) Systems	/journals/tvlsi	/journals/tvlsi/tvlsi\n" +
  "B	JPDC	Journal of Parallel and Distributed Computing	/journals/jpdc	/journals/jpdc/jpdc\n" +
  "B	JSA	Journal of Systems Architecture: Embedded Software Design	/journals/jsa	/journals/jsa/jsa\n" +
  "B	PARCO	Parallel Computing	/conf/parco	/conf/parco/parco\n" +
  "B		Performance Evaluation: An International Journal	/journals/pe	/journals/pe/pe\n" +
  "C	JETC	ACM Journal on Emerging Technologies in Computing Systems	/journals/jetc	/journals/jetc/jetc\n" +
  "C		Concurrency and Computation: Practice and Experience	/journals/concurrency	/journals/concurrency/concurrency\n" +
  "C	DC	Distributed Computing	/journals/dc	/journals/dc/dc\n" +
  "C	FGCS	Future Generation Computer Systems	/journals/fgcs	/journals/fgcs/fgcs\n" +
  "C	TCC	IEEE Transactions on Cloud Computing	/journals/tcc	/journals/tcc/tcc\n" +
  "C	Integration	Integration, the VLSI Journal	/journals/integration	/journals/integration/integration\n" +
  "C	JETTA	Journal of Electronic Testing-Theory and Applications	/journals/et	/journals/et/et\n" +
  "C	JGC	The Journal of Grid computing	/journals/grid	/journals/grid/grid\n" +
  "C	RTS	Real-Time Systems	/journals/rts	/journals/rts/rts\n" +
  "C	TJSC	The Journal of Supercomputing	/journals/tjs	/journals/tjs/tjs\n" +
  "C	TCASI	IEEE Transactions on Circuits and Systems I: Regular Papers	/journals/tcasI	/journals/tcasI/tcasI\n" +
  "C	CCF-THPC	CCF Transactions on High Performance Computing	/journals/ccfthpc	/journals/ccfthpc/ccfthpc\n" +
  "C	TSUSC	IEEE Transactions on Sustainable Computing	/journals/tsusc	/journals/tsusc/tsusc\n" +
  "A	PPoPP	ACM SIGPLAN Symposium on Principles & Practice of Parallel Programming	/conf/ppopp	/conf/ppopp/ppopp\n" +
  "A	FAST	Conference on File and Storage Technologies	/conf/fast	/conf/fast/fast\n" +
  "A	DAC	Design Automation Conference	/conf/dac	/conf/dac/dac\n" +
  "A	HPCA	High-Performance Computer Architecture	/conf/hpca	/conf/hpca/hpca\n" +
  "A	MICRO	IEEE/ACM International Symposium on Microarchitecture	/conf/micro	/conf/micro/micro\n" +
  "A	SC	International Conference for High Performance Computing, Networking, Storage, and Analysis	/conf/sc	/conf/sc/sc\n" +
  "A	ASPLOS	International Conference on Architectural Support for Programming Languages and Operating Systems	/conf/asplos	/conf/asplos/asplos\n" +
  "A	ISCA	International Symposium on Computer Architecture	/conf/isca	/conf/isca/isca\n" +
  "A	USENIX ATC	USENIX Annual Technical Conference	/conf/usenix	/conf/usenix/usenix\n" +
  "A	EuroSys	European Conference on Computer Systems	/conf/eurosys	/conf/eurosys/eurosys\n" +
  "B	SOCC	ACM Symposium on Cloud Computing	/conf/cloud	/conf/cloud/socc\n" +
  "B	SPAA	ACM Symposium on Parallelism in Algorithms and Architectures	/conf/spaa	/conf/spaa/spaa\n" +
  "B	PODC	ACM Symposium on Principles of Distributed Computing	/conf/podc	/conf/podc/podc\n" +
  "B	FPGA	ACM/SIGDA International Symposium on Field-Programmable Gate Arrays	/conf/fpga	/conf/fpga/fpga\n" +
  "B	CGO	Code Generation and Optimization	/conf/cgo	/conf/cgo/cgo\n" +
  "B	DATE	Design, Automation & Test in Europe	/conf/date	/conf/date/date\n" +
  "B	HOT CHIPS	ACM Symposium on High Performance Chips	/conf/hotchips	/conf/hotchips/hotchips\n" +
  "B	CLUSTER	IEEE International Conference on Cluster Computing	/conf/cluster	/conf/cluster/cluster\n" +
  "B	ICCD	International Conference on Computer Design	/conf/iccd	/conf/iccd/iccd\n" +
  "B	ICCAD	International Conference on Computer-Aided Design	/conf/iccad	/conf/iccad/iccad\n" +
  "B	ICDCS	International Conference on Distributed Computing Systems	/conf/icdcs	/conf/icdcs/icdcs\n" +
  "B	CODES+ISSS	International Conference on Hardware/Software Co-design and System Synthesis	/conf/codes	/conf/codes/codes\n" +
  "B	HiPEAC	International Conference on High Performance and Embedded Architectures and Compilers	/conf/hipeac	/conf/hipeac/hipeac\n" +
  "B	SIGMETRICS	International Conference on Measurement and Modeling of Computer Systems	/conf/sigmetrics	/conf/sigmetrics/sigmetrics\n" +
  "B	PACT	International Conference on Parallel Architectures and Compilation Techniques	/conf/IEEEpact	/conf/IEEEpact/pact\n" +
  "B	PACT	International Conference on Parallel Architectures and Compilation Techniques	/conf/IEEEpact	/conf/IEEEpact/IEEEpact\n" +
  "B	ICPP	International Conference on Parallel Processing	/conf/icpp	/conf/icpp/icpp\n" +
  "B	ICS	International Conference on Supercomputing	/conf/ics	/conf/ics/ics\n" +
  "B	VEE	International Conference on Virtual Execution Environments	/conf/vee	/conf/vee/vee\n" +
  "B	IPDPS	International Parallel & Distributed Processing Symposium	/conf/ipps	/conf/ipps/ipdps\n" +
  "B	Performance	International Symposium on Computer Performance, Modeling, Measurements and Evaluation	/conf/performance	/conf/performance/performance\n" +
  "B	HPDC	International Symposium on High Performance Distributed Computing	/conf/hpdc	/conf/hpdc/hpdc\n" +
  "B	ITC	International Test Conference	/conf/itc	/conf/itc/itc\n" +
  "B	LISA	Large Installation system Administration Conference	/conf/lisa	/conf/lisa/lisa\n" +
  "B	MSST	Mass Storage Systems and Technologies	/conf/mss	/conf/mss/msst\n" +
  "B	RTAS	Real-Time and Embedded Technology and Applications Symposium	/conf/rtas	/conf/rtas/rtas\n" +
  "B	Euro-Par	European Conference on Parallel and Distributed Computing	/conf/europar	/conf/europar/europar\n" +
  "C	CF	ACM International Conference on Computing Frontiers	/conf/cf	/conf/cf/cf\n" +
  "C	SYSTOR	ACM International Systems and Storage Conference	/conf/systor	/conf/systor/systor\n" +
  "C	NOCS	ACM/IEEE International Symposium on Networks-on-Chip	/conf/nocs	/conf/nocs/nocs\n" +
  "C	ASAP	Application-Specific Systems, Architectures, and Processors	/conf/asap	/conf/asap/asap\n" +
  "C	ASP-DAC	Asia and South Pacific Design Automation Conference	/conf/aspdac	/conf/aspdac/aspdac\n" +
  "C	ETS	European Test Symposium	/conf/ets	/conf/ets/ets\n" +
  "C	FPL	Field Programmable Logic and Applications	/conf/fpl	/conf/fpl/fpl\n" +
  "C	FCCM	Field-Programmable Custom Computing Machines	/conf/fccm	/conf/fccm/fccm\n" +
  "C	GLSVLSI	Great Lakes Symposium on VLSI	/conf/glvlsi	/conf/glvlsi/glvlsi\n" +
  "C	ATS	IEEE Asian Test Symposium	/conf/ats	/conf/ats/ats\n" +
  "C	HPCC	IEEE International Conference on High Performance Computing and Communications	/conf/hpcc	/conf/hpcc/hpcc\n" +
  "C	HiPC	IEEE International Conference on High Performance Computing, Data and Analytics	/conf/hipc	/conf/hipc/hipc\n" +
  "C	MASCOTS	IEEE International Symposium on Modeling, Analysis, and Simulation of Computer and Telecommunication Systems	/conf/mascots	/conf/mascots/mascots\n" +
  "C	ISPA	IEEE International Symposium on Parallel and Distributed Processing with Applications	/conf/ispa	/conf/ispa/ispa\n" +
  "C	CCGRID	IEEE/ACM International Symposium on Cluster, Cloud and Grid Computing	/conf/ccgrid	/conf/ccgrid/ccgrid\n" +
  "C	NPC	IFIP International Conference on Network and Parallel Computing	/conf/npc	/conf/npc/npc\n" +
  "C	ICA3PP	International Conference on Algorithms and Architectures for Parallel Processing	/conf/ica3pp	/conf/ica3pp/ica3pp\n" +
  "C	CASES	International Conference on Compilers, Architectures, and Synthesis for Embedded Systems	/conf/cases	/conf/cases/cases\n" +
  "C	FPT	International Conference on Field-Programmable Technology	/conf/fpt	/conf/icfpt/icfpt\n" +
  "C	FPT	International Conference on Field-Programmable Technology	/conf/fpt	/conf/fpt/fpt\n" +
  "C	ICPADS	International Conference on Parallel and Distributed Systems	/conf/icpads	/conf/icpads/icpads\n" +
  "C	ISCAS	International Symposium on Circuits and Systems	/conf/iscas	/conf/iscas/iscas\n" +
  "C	ISLPED	International Symposium on Low Power Electronics and Design	/conf/islped	/conf/islped/islped\n" +
  "C	ISPD	International Symposium on Physical Design	/conf/ispd	/conf/ispd/ispd\n" +
  "C	HotI	Symposium on High-Performance Interconnects	/conf/hoti	/conf/hoti/hoti\n" +
  "C	VTS	VLSI Test Symposium	/conf/vts	/conf/vts/vts\n" +
  "C	ITC-Asia	International Test Conference in Asia	/conf/itc-asia	/conf/itc-asia/itc-asia\n" +
  "A	JSAC	IEEE Journal of Selected Areas in Communications	/journals/jsac	/journals/jsac/jsac\n" +
  "A	TMC	IEEE Transactions on Mobile Computing	/journals/tmc	/journals/tmc/tmc\n" +
  "A	TON	IEEE/ACM Transactions on Networking	/journals/ton	/journals/ton/ton\n" +
  "B	TOIT	ACM Transactions on Internet Technology	/journals/toit	/journals/toit/toit\n" +
  "B	TOMCCAP	ACM Transactions on Multimedia Computing, Communications and Applications	/journals/tomccap	/journals/tomccap/tomccap\n" +
  "B	TOSN	ACM Transactions on Sensor Networks	/journals/tosn	/journals/tosn/tosn\n" +
  "B	CN	Computer Networks	/journals/cn	/journals/cn/cn\n" +
  "B	TCOM	IEEE Transactions on Communications	/journals/tcom	/journals/tcom/tcom\n" +
  "B	TWC	IEEE Transactions on Wireless Communications	/journals/twc	/journals/twc/twc\n" +
  "C		Ad hoc Networks	/journals/adhoc	/journals/adhoc/adhoc\n" +
  "C	CC	Computer Communications	/journals/comcom	/journals/comcom/comcom\n" +
  "C	TNSM	IEEE Transactions on Network and Service Management	/journals/tnsm	/journals/tnsm/tnsm\n" +
  "C		IET Communications	/journals/iet-com	/journals/iet-com/iet-com\n" +
  "C	JNCA	Journal of Network and Computer Applications	/journals/jnca	/journals/jnca/jnca\n" +
  "C	MONET	Mobile Networks & Applications	/journals/monet	/journals/monet/monet\n" +
  "C		Networks	/journals/networks	/journals/networks/networks\n" +
  "C	PPNA	Peer-to-Peer Networking and Applications	/journals/ppna	/journals/ppna/ppna\n" +
  "C	WCMC	Wireless Communications & Mobile Computing	/journals/wicomm	/journals/wicomm/wicomm\n" +
  "C		Wireless Networks	/journals/winet	/journals/winet/winet\n" +
  "C	IOT	IEEE Internet of Things Journal	/journals/iotj	/journals/iotj/iotj\n" +
  "A	SIGCOMM	ACM International Conference on Applications, Technologies, Architectures, and Protocols for Computer Communication	/conf/sigcomm	/conf/sigcomm/sigcomm\n" +
  "A	MobiCom	ACM International Conference on Mobile Computing and Networking	/conf/mobicom	/conf/mobicom/mobicom\n" +
  "A	INFOCOM	IEEE International Conference on Computer Communications	/conf/infocom	/conf/infocom/infocom\n" +
  "A	NSDI	Symposium on Network System Design and Implementation	/conf/nsdi	/conf/nsdi/nsdi\n" +
  "B	SenSys	ACM Conference on Embedded Networked Sensor Systems	/conf/sensys	/conf/sensys/sensys\n" +
  "B	CoNEXT	ACM International Conference on emerging Networking EXperiments and Technologies	/conf/conext	/conf/conext/conext\n" +
  "B	SECON	IEEE Communications Society Conference on Sensor and Ad Hoc Communications and Networks	/conf/secon	/conf/secon/secon\n" +
  "B	IPSN	International Conference on Information Processing in Sensor Networks	/conf/ipsn	/conf/ipsn/ipsn\n" +
  "B	MobiSys	International Conference on Mobile Systems, Applications, and Services	/conf/mobisys	/conf/mobisys/mobisys\n" +
  "B	ICNP	International Conference on Network Protocols	/conf/icnp	/conf/icnp/icnp\n" +
  "B	MobiHoc	International Symposium on Mobile Ad Hoc Networking and Computing	/conf/mobihoc	/conf/mobihoc/mobihoc\n" +
  "B	NOSSDAV	International Workshop on Network and Operating System Support for Digital Audio and Video	/conf/nossdav	/conf/nossdav/nossdav\n" +
  "B	IWQoS	International Workshop on Quality of Service	/conf/iwqos	/conf/iwqos/iwqos\n" +
  "B	IMC	Internet Measurement Conference	/conf/imc	/conf/imc/imc\n" +
  "C	ANCS	Architectures for Networking and Communications Systems	/conf/ancs	/conf/ancs/ancs\n" +
  "C	APNOMS	Asia-Pacific Network Operations and Management Symposium	/conf/apnoms	/conf/apnoms/apnoms\n" +
  "C	FORTE	Formal Techniques for Networked and Distributed Systems	/conf/forte	/conf/forte/forte\n" +
  "C	LCN	IEEE Conference on Local Computer Networks	/conf/lcn	/conf/lcn/lcn\n" +
  "C	GLOBECOM	IEEE Global Communications Conference	/conf/globecom	/conf/globecom/globecom\n" +
  "C	ICC	IEEE International Conference on Communications	/conf/icc	/conf/icc/icc\n" +
  "C	ICCCN	IEEE International Conference on Computer Communications and Networks	/conf/icccn	/conf/icccn/icccn\n" +
  "C	MASS	IEEE International Conference on Mobile Ad-hoc and Sensor Systems	/conf/mass	/conf/mass/mass\n" +
  "C	P2P	IEEE International Conference on P2P Computing	/conf/p2p	/conf/p2p/p2p\n" +
  "C	IPCCC	IEEE International Performance Computing and Communications Conference	/conf/ipccc	/conf/ipccc/ipccc\n" +
  "C	WoWMoM	IEEE International Symposium on a World of Wireless Mobile and Multimedia Networks	/conf/wowmom	/conf/wowmom/wowmom\n" +
  "C	ISCC	IEEE Symposium on Computers and Communications	/conf/iscc	/conf/iscc/iscc\n" +
  "C	WCNC	IEEE Wireless Communications & Networking Conference	/conf/wcnc	/conf/wcnc/wcnc\n" +
  "C	Networking	IFIP International Conferences on Networking	/conf/networking	/conf/networking/networking\n" +
  "C	IM	IFIP/IEEE International Symposium on Integrated Network Management	/conf/im	/conf/im/im\n" +
  "C	MSN	International Conference on Mobile Ad-hoc and Sensor Networks	/conf/msn	/conf/msn/msn\n" +
  "C	MSWiM	International Conference on Modeling, Analysis and Simulation of Wireless and Mobile Systems	/conf/mswim	/conf/mswim/mswim\n" +
  "C	WASA	International Conference on Wireless Algorithms, Systems, and Applications	/conf/wasa	/conf/wasa/wasa\n" +
  "C	HotNets	The Workshop on Hot Topics in Networks	/conf/hotnets	/conf/hotnets/hotnets\n" +
  "C	APNet	Asia-Pacific Workshop on Networking	/conf/apnet	/conf/apnet/apnet\n" +
  "A	TDSC	IEEE Transactions on Dependable and Secure Computing	/journals/tdsc	/journals/tdsc/tdsc\n" +
  "A	TIFS	IEEE Transactions on Information Forensics and Security	/journals/tifs	/journals/tifs/tifs\n" +
  "A		Journal of Cryptology	/journals/joc	/journals/joc/joc\n" +
  "B	TOPS	ACM Transactions on Privacy and Security	/journals/tissec	/journals/tissec/tissec\n" +
  "B		Computers & Security	/journals/compsec	/journals/compsec/compsec\n" +
  "B		Designs, Codes and Cryptography	/journals/dcc	/journals/dcc/dcc\n" +
  "B	JCS	Journal of Computer Security	/journals/jcs	/journals/jcs/jcs\n" +
  "C	CLSR	Computer Law and Security Review	/journals/clsr	/journals/clsr/clsr\n" +
  "C		EURASIP Journal on Information Security	/journals/ejisec	/journals/ejisec/ejisec\n" +
  "C		IET Information Security	/journals/iet-ifs	/journals/iet-ifs/iet-ifs\n" +
  "C	IMCS	Information Management & Computer Security	/journals/imcs	/journals/imcs/imcs\n" +
  "C	IJICS	International Journal of Information and Computer Security	/journals/ijics	/journals/ijics/ijics\n" +
  "C	IJISP	International Journal of Information Security and Privacy	/journals/ijisp	/journals/ijisp/ijisp\n" +
  "C	JISA	Journal of Information Security and Application	/journals/istr	/journals/istr/istr\n" +
  "C	SCN	Security and Communication Networks	/journals/scn	/journals/scn/scn\n" +
  "C		Cybersecurity	/journals/cybersec	/journals/cybersec/cybersec\n" +
  "A	CCS	ACM Conference on Computer and Communications Security	/conf/ccs	/conf/ccs/ccs\n" +
  "A	EUROCRYPT	European Cryptology Conference	/conf/eurocrypt	/conf/eurocrypt/eurocrypt\n" +
  "A	S&P	IEEE Symposium on Security and Privacy	/conf/sp	/conf/sp/sp\n" +
  "A	CRYPTO	International Cryptology Conference	/conf/crypto	/conf/crypto/crypto\n" +
  "A	USENIX Security	Usenix Security Symposium	/conf/uss	/conf/uss/uss\n" +
  "A	NDSS	ISOC Network and Distributed System Security Symposium	/conf/ndss	/conf/ndss/ndss\n" +
  "B	ACSAC	Annual Computer Security Applications Conference	/conf/acsac	/conf/acsac/acsac\n" +
  "B	ASIACRYPT	Annual International Conference on the Theory and Application of Cryptology and Information Security	/conf/asiacrypt	/conf/asiacrypt/asiacrypt\n" +
  "B	ESORICS	European Symposium on Research in Computer Security	/conf/esorics	/conf/esorics/esorics\n" +
  "B	FSE	Fast Software Encryption	/conf/fse	/conf/fse/fse\n" +
  "B	CSFW	IEEE Computer Security Foundations Workshop	/conf/csfw	/conf/csfw/csfw\n" +
  "B	SRDS	IEEE International Symposium on Reliable Distributed Systems	/conf/srds	/conf/srds/srds\n" +
  "B	CHES	International Conference on Cryptographic Hardware and Embedded Systems	/conf/ches	/conf/ches/ches\n" +
  "B	DSN	International Conference on Dependable Systems and Networks	/conf/dsn	/conf/dsn/dsn\n" +
  "B	RAID	International Symposium on Recent Advances in Intrusion Detection	/conf/raid	/conf/raid/raid\n" +
  "B	PKC	International Workshop on Practice and Theory in Public Key Cryptography	/conf/pkc	/conf/pkc/pkc\n" +
  "B	TCC	Theory of Cryptography Conference	/conf/tcc	/conf/tcc/tcc\n" +
  "C	WiSec	ACM Conference on Security and Privacy in Wireless and Mobile Networks	/conf/wisec	/conf/wisec/wisec\n" +
  "C	SACMAT	ACM Symposium on Access Control Models and Technologies	/conf/sacmat	/conf/sacmat/sacmat\n" +
  "C	DRM	ACM Workshop on Digital Rights Management	/conf/drm	/conf/drm/drm\n" +
  "C	IH&MMSec	ACM Workshop on Information Hiding and Multimedia Security	/conf/ih	/conf/ih/ihmmsec\n" +
  "C	IH&MMSec	ACM Workshop on Information Hiding and Multimedia Security	/conf/ih	/conf/ih/ih\n" +
  "C	ACNS	Applied Cryptography and Network Security	/conf/acns	/conf/acns/acns\n" +
  "C	AsiaCCS	Asia Conference on Computer and Communications Security	/conf/asiaccs	/conf/ccs/asiaccs\n" +
  "C	AsiaCCS	Asia Conference on Computer and Communications Security	/conf/asiaccs	/conf/asiaccs/asiaccs\n" +
  "C	ACISP	AustralasiaConferenceonInformation SecurityandPrivacy	/conf/acisp	/conf/acisp/acisp\n" +
  "C	CT-RSA	RSA Conference, Cryptographers' Track	/conf/ctrsa	/conf/ctrsa/ctrsa\n" +
  "C	DIMVA	Detection of Intrusions and Malware &Vulnerability Assessment	/conf/dimva	/conf/dimva/dimva\n" +
  "C	DFRWS	Digital Forensic Research Workshop	/conf/dfrws	/conf/dfrws/dfrws\n" +
  "C	FC	Financial Cryptography and Data Security	/conf/fc	/conf/fc/fc\n" +
  "C	TrustCom	IEEE International Conference on Trust,Security and Privacy in Computing and Communications	/conf/trustcom	/conf/trustcom/trustcom\n" +
  "C	SEC	IFIP International Information Security Conference	/conf/sec	/conf/sec/sec\n" +
  "C	IFIP WG 11.9	IFIP WG 11.9 International Conference on Digital Forensics	/conf/ifip11-9	/conf/ifip11-9/df\n" +
  "C	ISC	Information Security Conference	/conf/isw	/conf/isw/isc\n" +
  "C	ISC	Information Security Conference	/conf/isw	/conf/isw/isw\n" +
  "C	ICDF2C	International Conference on Digital Forensics & Cyber Crime	/conf/icdf2c	/conf/icdf2c/icdf2c\n" +
  "C	ICICS	International Conference on Information and Communications Security	/conf/icics	/conf/icics/icics\n" +
  "C	SecureComm	International Conference on Security and Privacy in Communication Networks	/conf/securecomm	/conf/securecomm/securecomm\n" +
  "C	NSPW	New Security Paradigms Workshop	/conf/nspw	/conf/nspw/nspw\n" +
  "C	PAM	Passive and Active Measurement Conference	/conf/pam	/conf/pam/pam\n" +
  "C	PETS	Privacy Enhancing Technologies Symposium	/conf/pet	/conf/pet/pets\n" +
  "C	PETS	Privacy Enhancing Technologies Symposium	/conf/pet	/conf/pet/pet\n" +
  "C	SAC	Selected Areas in Cryptography	/conf/sacrypt	/conf/sacrypt/sacrypt\n" +
  "C	SOUPS	Symposium On Usable Privacy and Security	/conf/soups	/conf/soups/soups\n" +
  "C	HotSec	USENIX Workshop on Hot Topics in Security	/conf/uss/	/conf/uss/hotsec\n" +
  "C	EuroS&P	IEEE European Symposium on Security and Privacy	/conf/eurosp	/conf/eurosp/eurosp\n" +
  "C	Inscrypt	International Conference on Information Security and Cryptology	/conf/icisc	/conf/icisc/icisc\n" +
  "A	TOPLAS	ACM Transactions on Programming Languages & Systems	/journals/toplas	/journals/toplas/toplas\n" +
  "A	TOSEM	ACM Transactions on Software Engineering and Methodology	/journals/tosem	/journals/tosem/tosem\n" +
  "A	TSE	IEEE Transactions on Software Engineering	/journals/tse	/journals/tse/tse\n" +
  "A	TSC	IEEE Transactions on Service Computing	/journals/tsc	/journals/tsc/tsc\n" +
  "B	ASE	Automated Software Engineering	/journals/ase	/journals/ase/ase\n" +
  "B	ESE	Empirical Software Engineering	/journals/ese	/journals/ese/ese\n" +
  "B	IETS	IET Software	/journals/iee	/journals/iee/iee-s\n" +
  "B	IST	Information and Software Technology	/journals/infsof	/journals/infsof/infsof\n" +
  "B	JFP	Journal of Functional Programming	/journals/jfp	/journals/jfp/jfp\n" +
  "B		Journal of Software: Evolution and Process	/journals/smr	/journals/smr/smr\n" +
  "B	JSS	Journal of Systems and Software	/journals/jss	/journals/jss/jss\n" +
  "B	RE	Requirements Engineering	/journals/re	/journals/re/re\n" +
  "B	SCP	Science of Computer Programming	/journals/scp	/journals/scp/scp\n" +
  "B	SoSyM	Software and System Modeling	/journals/sosym	/journals/sosym/sosym\n" +
  "B	STVR	Software Testing, Verification and Reliability	/journals/stvr	/journals/stvr/stvr\n" +
  "B	SPE	Software: Practice and Experience	/journals/spe	/journals/spe/spe\n" +
  "C	CL	Computer Languages, Systems and Structures	/journals/cl	/journals/cl/cl\n" +
  "C	IJSEKE	International Journal on Software Engineering and Knowledge Engineering	/journals/ijseke	/journals/ijseke/ijseke\n" +
  "C	STTT	International Journal on Software Tools for Technology Transfer	/journals/sttt	/journals/sttt/sttt\n" +
  "C	JLAP	Journal of Logic and Algebraic Programming	/journals/jlap	/journals/jlap/jlap\n" +
  "C	JLAP	Journal of Logic and Algebraic Programming	/journals/jlap	/journals/jlp/jlp\n" +
  "C	JWE	Journal of Web Engineering	/journals/jwe	/journals/jwe/jwe\n" +
  "C	SOCA	Service Oriented Computing and Applications	/journals/soca	/journals/soca/soca\n" +
  "C	SQJ	Software Quality Journal	/journals/sqj	/journals/sqj/sqj\n" +
  "C	TPLP	Theory and Practice of Logic Programming	/journals/tplp	/journals/tplp/tplp\n" +
  "C	PACM PL	Proceedings of the ACM on Programming Languages	/journals/pacmpl	/journals/pacmpl/pacmpl\n" +
  "A	PLDI	ACM SIGPLAN Symposium on Programming Language Design & Implementation	/conf/pldi	/conf/pldi/pldi\n" +
  "A	POPL	ACM SIGPLAN-SIGACT Symposium on Principles of Programming Languages	/conf/popl	/conf/popl/popl\n" +
  "A	FSE/ESEC	ACM SIGSOFT Symposium on the Foundation of Software Engineering/ European Software Engineering Conference	/conf/sigsoft	/conf/sigsoft/fse\n" +
  "A	FSE 	ACM INTERNATIONAL CONFERENCE ON THE FOUNDATIONS OF SOFTWARE ENGINEERING	/conf/sigsoft	/conf/sigsoft/fse\n" +
  "A	SOSP	ACM Symposium on Operating Systems Principles	/conf/sosp	/conf/sosp/sosp\n" +
  "A	OOPSLA	Conference on Object-Oriented Programming Systems, Languages,and Applications	/conf/oopsla	/conf/oopsla/oopsla\n" +
  "A	ASE	International Conference on Automated Software Engineering	/conf/kbse	/conf/kbse/ase\n" +
  "A	ASE	International Conference on Automated Software Engineering	/conf/kbse	/conf/kbse/	/conf/kbse/kbse\n" +
  "A	ICSE	International Conference on Software Engineering	/conf/icse	/conf/icse/icse\n" +
  "A	ISSTA	International Symposium on Software Testing and Analysis	/conf/issta	/conf/issta/issta\n" +
  "A	OSDI	USENIX Symposium on Operating Systems Design and Implementations	/conf/osdi	/conf/osdi/osdi\n" +
  "A	FM	International Symposium on Formal Methods	/conf/fm	/conf/fm/fm\n" +
  "B	ECOOP	European Conference on Object-Oriented Programming	/conf/ecoop	/conf/ecoop/ecoop\n" +
  "B	ETAPS	European Joint Conferences on Theory and Practice of Software	/conf/etaps	/conf/esop/esop\n" +
  "B	ETAPS	European Joint Conferences on Theory and Practice of Software	/conf/etaps	/conf/fase/fase\n" +
  "B	ETAPS	European Joint Conferences on Theory and Practice of Software	/conf/etaps	/conf/fossacs/fossacs\n" +
  "B	ETAPS	European Joint Conferences on Theory and Practice of Software	/conf/etaps	/conf/tacas/tacas\n" +
  "B	ETAPS	European Joint Conferences on Theory and Practice of Software	/conf/etaps	/conf/post/post\n" +
  "B	ETAPS	European Joint Conferences on Theory and Practice of Software	/conf/etaps	/conf/spin/spin\n" +
  "B	ICPC	IEEE International Conference on Program Comprehension	/conf/iwpc	/conf/iwpc/icpc\n" +
  "B	ICPC	IEEE International Conference on Program Comprehension	/conf/iwpc	/conf/iwpc/iwpc\n" +
  "B	RE	IEEE International Requirement Engineering Conference	/conf/re	/conf/re/re\n" +
  "B	RE	IEEE International Requirement Engineering Conference	/conf/re	/conf/icre/icre\n" +
  "B	CAiSE	International Conference on Advanced Information Systems Engineering	/conf/caise	/conf/caise/caise\n" +
  "B	ICFP	International Conference on Function Programming	/conf/icfp	/conf/icfp/icfp\n" +
  "B	LCTES	International Conference on Languages,Compilers, Tools and Theory for Embedded Systems	/conf/lctrts	/conf/lctrts/lctes\n" +
  "B	MoDELS	International Conference on Model Driven Engineering Languages and Systems	/conf/models	/conf/models/models\n" +
  "B	CP	International Conference on Principles and Practice of Constraint Programming	/conf/cp	/conf/cp/cp\n" +
  "B	ICSOC	International Conference on Service Oriented Computing	/conf/icsoc	/conf/icsoc/icsoc\n" +
  "B	SANER	International Conference on Software Analysis, Evolution, and Reengineering	/conf/wcre	/conf/wcre/saner\n" +
  "B	SANER	International Conference on Software Analysis, Evolution, and Reengineering	/conf/wcre	/conf/wcre/wcre\n" +
  "B	ICSME	International Conference on Software Maintenance and Evolution	/conf/icsm	/conf/icsm/icsme\n" +
  "B	ICSME	International Conference on Software Maintenance and Evolution	/conf/icsm	/conf/icsm/icsm\n" +
  "B	VMCAI	International Conference on Verification,Model Checking, and Abstract Interpretation	/conf/vmcai	/conf/vmcai/vmcai\n" +
  "B	ICWS	International Conference on Web Services(Research Track)	/conf/icws	/conf/icws/icws\n" +
  "B	Middleware	International Middleware Conference	/conf/middleware	/conf/middleware/middleware\n" +
  "B	SAS	International Static Analysis Symposium	/conf/sas	/conf/sas/sas\n" +
  "B	ESEM	International Symposium on Empirical Software Engineering and Measurement	/conf/esem	/conf/esem/esem\n" +
  "B	ISSRE	International Symposium on Software Reliability Engineering	/conf/issre	/conf/issre/issre\n" +
  "B	HotOS	USENIX Workshop on Hot Topics in Operating Systems	/conf/hotos	/conf/hotos/hotos\n" +
  "C	PEPM	ACM SIGPLAN Workshop on Partial Evaluation and Program Manipulation	/conf/pepm	/conf/pepm/pepm\n" +
  "C	PASTE	ACMSIGPLAN-SIGSOFT Workshop on Program Analysis for Software Tools and Engineering	/conf/paste	/conf/paste/paste\n" +
  "C	APLAS	Asian Symposium on Programming Languages and Systems	/conf/aplas	/conf/aplas/aplas\n" +
  "C	APSEC	Asia-Pacific Software Engineering Conference	/conf/apsec	/conf/apsec/apsec\n" +
  "C	EASE	Evaluation and Assessment in Software Engineering	/conf/ease	/conf/ease/ease\n" +
  "C	ICECCS	IEEE International Conference on Engineering of Complex Computer Systems	/conf/iceccs	/conf/iceccs/iceccs\n" +
  "C	ICST	IEEE International Conference on Software Testing, Verification and Validation	/conf/icst	/conf/icst/icst\n" +
  "C	ISPASS	IEEE International Symposium on Performance Analysis of Systems and Software	/conf/ispass	/conf/ispass/ispass\n" +
  "C	SCAM	IEEE International Working Conference on Source Code Analysis and Manipulation	/conf/scam	/conf/scam/scam\n" +
  "C	COMPSAC	International Computer Software and Applications Conference	/conf/compsac	/conf/compsac/compsac\n" +
  "C	ICFEM	International Conference on Formal Engineering Methods	/conf/icfem	/conf/icfem/icfem\n" +
  "C	TOOLS	International Conference on Objects, Models, Components, Patterns	/conf/tools	/conf/tools/tools\n" +
  "C	QSIC	International Conference on Quality Software	/conf/qsic	/conf/qsic/qsic\n" +
  "C	SCC	International Conference on Service Computing	/conf/IEEEscc	/conf/IEEEscc/scc\n" +
  "C	ICSSP	International Conference on Software and System Process	/conf/ispw	/conf/ispw/icssp\n" +
  "C	ICSSP	International Conference on Software and System Process	/conf/ispw	/conf/ispw/icsp\n" +
  "C	SEKE	International Conference on Software Engineering and Knowledge Engineering	/conf/seke	/conf/seke/seke\n" +
  "C	QRS	International Conference on Software Quality, Reliability and Security	/conf/qrs	/conf/qrs/qrs\n" +
  "C	ICSR	International Conference on Software Reuse	/conf/icsr	/conf/icsr/icsr\n" +
  "C	ICWE	International Conference on Web Engineering	/conf/icwe	/conf/icwe/icwe\n" +
  "C	SPIN	International SPIN Workshop on Model Checking of Software	/conf/spin	/conf/spin/spin\n" +
  "C	ATVA	International Symposium on Automated Technology for Verification and Analysis	/conf/atva	/conf/atva/atva\n" +
  "C	LOPSTR	International Symposium on Logic-based Program Synthesis and Transformation	/conf/lopstr	/conf/lopstr/lopstr\n" +
  "C	TASE	International Symposium on Theoretical Aspects of Software Engineering	/conf/tase	/conf/tase/tase\n" +
  "C	MSR	Mining Software Repositories	/conf/msr	/conf/msr/msr\n" +
  "C	REFSQ	Requirements Engineering: Foundation for Software Quality	/conf/refsq	/conf/refsq/refsq\n" +
  "C	WICSA	Working IEEE/IFIP Conference on Software Architecture	/conf/wicsa	/conf/wicsa/wicsa\n" +
  "C	Internetware	The Asia-Pacific Symposium on Internetware	/conf/internetware	/conf/internetware/internetware\n" +
  "C	RV	International Conference on Runtime Verification	/conf/rv	/conf/rv/rv\n" +
  "A 	TODS	ACM Transactions on Database Systems	/journals/tods	/journals/tods/tods\n" +
  "A 	TOIS	ACM Transactions on Information Systems	/journals/tois	/journals/tois/tois\n" +
  "A 	TKDE	IEEE Transactions on Knowledge and Data Engineering	/journals/tkde	/journals/tkde/tkde\n" +
  "A 	VLDBJ	The VLDB Journal	/journals/vldb	/journals/vldb/vldb\n" +
  "B	TKDD	ACM Transactions on Knowledge Discovery from Data	/journals/tkdd	/journals/tkdd/tkdd\n" +
  "B	TWEB	ACM Transactions on the Web	/journals/tweb	/journals/tweb\n" +
  "B	AEI	Advanced Engineering Informatics	/journals/aei	/journals/aei/aei\n" +
  "B	DKE	Data and Knowledge Engineering	/journals/dke	/journals/dke/dke\n" +
  "B	DMKD	Data Mining and Knowledge Discovery	/journals/datamine	/journals/datamine/datamine\n" +
  "B	EJIS	European Journal of Information Systems	/journals/ejis	/journals/ejis/ejis\n" +
  "B		GeoInformatica	/journals/geoinformatica	/journals/geoinformatica/geoinformatica\n" +
  "B	IPM	Information Processing and Management	/journals/ipm	/journals/ipm/ipm\n" +
  "B		Information Sciences	/journals/isci	/journals/isci/isci\n" +
  "B	IS	Information Systems	/journals/is	/journals/is/is\n" +
  "B	JASIST	Journal of the American Society for Information Science and Technology	/journals/jasis	/journals/jasis/jasis\n" +
  "B	JWS	Journal of Web Semantics	/journals/ws	/journals/ws/ws\n" +
  "B	KAIS	Knowledge and Information Systems	/journals/kais	/journals/kais/kais\n" +
  "C	DPD	Distributed and Parallel Databases	/journals/dpd	/journals/dpd/dpd\n" +
  "C	I&M	Information and Management	/journals/iam	/journals/iam/iam\n" +
  "C	IPL	Information Processing Letters	/journals/ipl	/journals/ipl/ipl\n" +
  "C	IR	Information Retrieval Journal	/journals/ir	/journals/ir/ir\n" +
  "C	IJCIS	International Journal of Cooperative Information Systems	/journals/ijcis	/journals/ijcis/ijcis\n" +
  "C	IJGIS	International Journal of Geographical Information Science	/journals/gis	/journals/gis/gis\n" +
  "C	IJIS	International Journal of Intelligent Systems	/journals/ijis	/journals/ijis/ijis\n" +
  "C	IJKM	International Journal of Knowledge Management	/journals/ijkm	/journals/ijkm/ijkm\n" +
  "C	IJSWIS	International Journal on Semantic Web and Information Systems	/journals/ijswis	/journals/ijswis/ijswis\n" +
  "C	JCIS	Journal of Computer Information Systems	/journals/jcis	/journals/jcis/jcis\n" +
  "C	JDM	Journal of Database Management	/journals/jdm	/journals/jdm/jdm\n" +
  "C	JGITM	Journal of Global Information Technology Management		\n" +
  "C	JIIS	Journal of Intelligent Information Systems	/journals/jiis	/journals/jiis/jiis\n" +
  "C	JSIS	Journal of Strategic Information Systems	/journals/jsis	/journals/jsis/jsis\n" +
  "C	DSE	Data Science and Engineering	/journals/dase	/journals/dase/dase\n" +
  "A	SIGMOD	ACM Conference on Management of Data	/conf/sigmod	/conf/sigmod/sigmod\n" +
  "A	SIGKDD	ACM Knowledge Discovery and Data Mining	/conf/kdd	/conf/kdd/kdd\n" +
  "A	ICDE	IEEE International Conference on Data Engineering	/conf/icde	/conf/icde/icde\n" +
  "A	SIGIR	International Conference on Research on Development in Information Retrieval	/conf/sigir	/conf/sigir/sigir\n" +
  "A	VLDB	International Conference on Very Large Data Bases	/conf/vldb	/conf/vldb/vldb\n" +
  "A	VLDB	International Conference on Very Large Data Bases	/journals/pvldb	/journals/pvldb/pvldb\n" +
  "B	CIKM	ACM International Conference on Information and Knowledge Management	/conf/cikm	/conf/cikm/cikm\n" +
  "B	WSDM	ACM International Conference on Web Search and Data Mining	/conf/wsdm	/conf/wsdm/wsdm\n" +
  "B	PODS	ACM Symposium on Principles of Database Systems	/conf/pods	/conf/pods/pods\n" +
  "B	DASFAA	Database Systems for Advanced Applications	/conf/dasfaa	/conf/dasfaa/dasfaa\n" +
  "B	ECML-PKDD	European Conference on Machine Learning and Principles and Practice of Knowledge Discovery in Databases	/conf/ecml	/conf/pkdd/pkdd\n" +
  "B	ISWC	IEEE International Semantic Web Conference	/conf/semweb	/conf/semweb/iswc\n" +
  "B	ICDM	International Conference on Data Mining	/conf/icdm	/conf/icdm/icdm\n" +
  "B	ICDT	International Conference on Database Theory	/conf/icdt	/conf/icdt/icdt\n" +
  "B	EDBT	International Conference on Extending DB Technology	/conf/edbt	/conf/edbt/edbt\n" +
  "B	CIDR	International Conference on Innovative Data Systems Research	/conf/cidr	/conf/cidr/cidr\n" +
  "B	SDM	SIAM International Conference on Data Mining	/conf/sdm	/conf/sdm/sdm\n" +
  "B	RecSys	ACM Conference on Recommender Systems	/conf/recsys	/conf/recsys/recsys\n" +
  "C	APWeb	Asia Pacific Web Conference	/conf/apweb	/conf/apweb/apweb\n" +
  "C	DEXA	Database and Expert System Applications	/conf/dexa	/conf/dexa/dexa\n" +
  "C	ECIR	European Conference on IR Research	/conf/ecir	/conf/ecir/ecir\n" +
  "C	ESWC	Extended Semantic Web Conference	/conf/esws	/conf/esws/eswc\n" +
  "C	WebDB	International ACM Workshop on Web and Databases	/conf/webdb	/conf/webdb/webdb\n" +
  "C	ER	International Conference on Conceptual Modeling	/conf/er	/conf/er/er\n" +
  "C	MDM	International Conference on Mobile Data Management	/conf/mdm	/conf/mdm/mdm\n" +
  "C	SSDBM	International Conference on Scientific and Statistical DB Management	/conf/ssdbm	/conf/ssdbm/ssdbm\n" +
  "C	WAIM	International Conference on Web Age Information Management	/conf/waim	/conf/waim/waim\n" +
  "C	SSTD	International Symposium on Spatial and Temporal Databases	/conf/ssd	/conf/ssd/sstd\n" +
  "C	PAKDD	Pacific-Asia Conference on Knowledge Discovery and Data Mining	/conf/pakdd	/conf/pakdd/pakdd\n" +
  "C	WISE	Web Information Systems Engineering	/conf/wise	/conf/wise/wise\n" +
  "C	ADMA	The International Conference on Advanced Data Mining and Applications	/conf/adma	/conf/adma/adma\n" +
  "A	TIT	IEEE Transactions on Information Theory	/journals/tit	/journals/tit/tit\n" +
  "A	IANDC	Information and Computation	/journals/iandc	/journals/iandc/iandc\n" +
  "A	SICOMP	SIAM Journal on Computing	/journals/siamcomp	/journals/siamcomp/siamcomp\n" +
  "B	TALG	ACM Transactions on Algorithms	/journals/talg	/journals/talg/talg\n" +
  "B	TOCL	ACM Transactions on Computational Logic	/journals/tocl	/journals/tocl/tocl\n" +
  "B	TOMS	ACM Transactions on Mathematical Software	/journals/toms	/journals/toms/toms\n" +
  "B	Algorithmica	Algorithmica	/journals/algorithmica	/journals/algorithmica/algorithmica\n" +
  "B	CC	Computational complexity	/journals/cc	/journals/cc/cc\n" +
  "B	FAC	Formal Aspects of Computing	/journals/fac	/journals/fac/fac\n" +
  "B	FMSD	Formal Methods in System Design	/journals/fmsd	/journals/fmsd/fmsd\n" +
  "B	INFORMS	INFORMS Journal on Computing	/journals/informs	/journals/informs/informs\n" +
  "B	JCSS	Journal of Computer and System Sciences	/journals/jcss	/journals/jcss/jcss\n" +
  "B	JGO	Journal of Global Optimization	/journals/jgo	/journals/jgo/jgo\n" +
  "B	JSC	Journal of Symbolic Computation	/journals/jsc	/journals/jsc/jsc\n" +
  "B	MSCS	Mathematical Structures in Computer Science	/journals/mscs	/journals/mscs/mscs\n" +
  "B	TCS	Theoretical Computer Science	/journals/tcs	/journals/tcs/tcs\n" +
  "C	ACTA	Acta Informatica	/journals/acta	/journals/acta/acta\n" +
  "C	APAL	Annals of Pure and Applied Logic	/journals/apal	/journals/apal/apal\n" +
  "C	DAM	Discrete Applied Mathematics	/journals/dam	/journals/dam/dam\n" +
  "C	FUIN	Fundamenta Informaticae	/journals/fuin	/journals/fuin/fuin\n" +
  "C	LISP	Higher-Order and Symbolic Computation	/journals/lisp	/journals/lisp/lisp\n" +
  "C	IPL	Information Processing Letters	/journals/ipl	/journals/ipl/ipl\n" +
  "C	JCOMPLEXITY	Journal of Complexity	/journals/jc	/journals/jc/jc\n" +
  "C	LOGCOM	Journal of Logic and Computation	/journals/logcom	/journals/logcom/logcom\n" +
  "C	JSL	Journal of Symbolic Logic	/journals/jsyml	/journals/jsyml/jsyml\n" +
  "C	LMCS	Logical Methods in Computer Science	/journals/lmcs	/journals/lmcs/lmcs\n" +
  "C	SIDMA	SIAM Journal on Discrete Mathematics	/journals/siamdm	/journals/siamdm/siamdm\n" +
  "C		Theory of Computing Systems	/journals/mst	/journals/mst/mst\n" +
  "A	STOC	ACM Symposium on Theory of Computing	/conf/stoc	/conf/stoc/stoc\n" +
  "A	SODA	ACM-SIAM Symposium on Discrete Algorithms	/conf/soda	/conf/soda/soda\n" +
  "A	CAV	Computer Aided Verification	/conf/cav	/conf/cav/cav\n" +
  "A	FOCS	IEEE Annual Symposium on Foundations of Computer Science	/conf/focs	/conf/focs/focs\n" +
  "A	LICS	IEEE Symposium on Logic in Computer Science	/conf/lics	/conf/lics/lics\n" +
  "B	SoCG	ACM Symposium on Computational Geometry	/conf/compgeom	/conf/compgeom/compgeom\n" +
  "B	ESA	European Symposium on Algorithms	/conf/esa	/conf/esa/esa\n" +
  "B	CCC	IEEE Conference on Computational Complexity	/conf/coco	/conf/coco/coco\n" +
  "B	ICALP	International Colloquium on Automata, Languages and Programming	/conf/icalp	/conf/icalp/icalp\n" +
  "B	CADE/IJCAR	International Conference on Automated Deduction/International Joint Conference on Automated Reasoning	/conf/cade	/conf/cade/ijcar\n" +
  "B	CADE/IJCAR	International Conference on Automated Deduction/International Joint Conference on Automated Reasoning	/conf/cade	/conf/cade/cade\n" +
  "B	CONCUR	International Conference on Concurrency Theory	/conf/concur	/conf/concur/concur\n" +
  "B	HSCC	International Conference on Hybrid Systems: Computation and Control	/conf/hybrid	/conf/hybrid/hscc\n" +
  "B	SAT	Theory and Applications of Satisfiability Testing	/conf/sat	/conf/sat/sat\n" +
  "B	COCOON	International Computing and Combinatorics Conference	/conf/cocoon	/conf/cocoon/cocoon\n" +
  "C	CSL	Computer Science Logic	/conf/csl	/conf/csl/csl\n" +
  "C	FMCAD	Formal Method in Computer-Aided Design	/conf/fmcad	/conf/fmcad/fmcad\n" +
  "C	FSTTCS	Foundations of Software Technology and Theoretical Computer Science	/conf/fsttcs	/conf/fsttcs/fsttcs\n" +
  "C	DSAA	IEEE International Conference on Data Science and Advanced Analytics	/conf/dsaa	/conf/dsaa/dsaa\n" +
  "C	ICTAC	International Colloquium on Theoretical Aspects of Computing	/conf/ictac	/conf/ictac/ictac\n" +
  "C	IPCO	International Conference on Integer Programming and Combinatorial Optimization	/conf/ipco	/conf/ipco/ipco\n" +
  "C	RTA	International Conference on Rewriting Techniques and Applications	/conf/rta	/conf/rta/rta\n" +
  "C	ISAAC	International Symposium on Algorithms and Computation	/conf/isaac	/conf/isaac/isaac\n" +
  "C	MFCS	Mathematical Foundations of Computer Science	/conf/mfcs	/conf/mfcs/mfcs\n" +
  "C	STACS	Symposium on Theoretical Aspects of Computer Science	/conf/stacs	/conf/stacs/stacs\n" +
  "C	SETTA	International Symposium on Dependable Software Engineering: Theories, Tools, and Applications	/conf/setta	/conf/setta/setta\n" +
  "A	TOG	ACM Transactions on Graphics	/journals/tog	/journals/tog/tog\n" +
  "A	TIP	IEEE Transactions on Image Processing	/journals/tip	/journals/tip/tip\n" +
  "A	TVCG	IEEE Transactions on Visualization and Computer Graphics	/journals/tvcg	/journals/tvcg/tvcg\n" +
  "B	TOMCCAP	ACM Transactions on Multimedia Computing,Communications and Application	/journals/tomccap	/journals/tomccap/tomccap\n" +
  "B	CAGD	Computer Aided Geometric Design	/journals/cagd	/journals/cagd/cagd\n" +
  "B	CGF	Computer Graphics Forum	/journals/cgf	/journals/cgf/cgf\n" +
  "B	CAD	Computer-Aided Design	/journals/cad	/journals/cad/cad\n" +
  "B	GM	Graphical Models	/journals/cvgip	/journals/cvgip/cvgip\n" +
  "B	TCSVT	IEEE Transactions on Circuits and Systems for Video Technology	/journals/tcsv	/journals/tcsv/tcsv\n" +
  "B	TMM	IEEE Transactions on Multimedia	/journals/tmm	/journals/tmm/tmm\n" +
  "B	JASA	Journal of The Acoustical Society of America		\n" +
  "B	SIIMS	SIAM Journal on Imaging Sciences	/journals/siamis	/journals/siamis/siamis\n" +
  "B	Speech Com	Speech Communication	/journals/speech	/journals/speech/speech\n" +
  "C	CGTA	Computational Geometry: Theory and Applications	/journals/comgeo	/journals/comgeo/comgeo\n" +
  "C	CAVW	Computer Animation and Virtual Worlds	/journals/jvca	/journals/jvca/jvca\n" +
  "C	C&G	Computers & Graphics	/journals/cg	/journals/cg/cg\n" +
  "C	DCG	Discrete & Computational Geometry	/journals/dcg	/journals/dcg/dcg\n" +
  "C	SPL	IEEE Signal Processing Letters	/journals/spl	/journals/spl/spl\n" +
  "C	IET-IPR	IET Image Processing	/journals/iet-ipr	/journals/iet-ipr/iet-ipr\n" +
  "C	JVCIR	Journal of Visual Communication and Image Representation	/journals/jvcir	/journals/jvcir/jvcir\n" +
  "C	MS	Multimedia Systems	/journals/mms	/journals/mms/mms\n" +
  "C	MTA	Multimedia Tools and Applications	/journals/mta	/journals/mta/mta\n" +
  "C		Signal Processing	/journals/sigpro	/journals/sigpro/sigpro\n" +
  "C	SPIC	Signal Processing: Image Communication	/journals/spic	/journals/spic/spic\n" +
  "C	TVC	The Visual Computer	/journals/vc	/journals/vc/vc\n" +
  "C	CVMJ	Computational Visual Media	/journals/cvm	/journals/cvm/cvm\n" +
  "A	ACM MM	ACM International Conference on Multimedia	/conf/mm	/conf/mm/mm\n" +
  "A	SIGGRAPH	ACM SIGGRAPH Annual Conference	/conf/siggraph	/conf/siggraph/siggraph\n" +
  "A	VR	IEEE Virtual Reality	/conf/vr	/conf/vr/vr\n" +
  "A	IEEE VIS	IEEE Visualization Conference	/conf/visualization	/conf/visualization/visualization\n" +
  "B	ICMR	ACM SIGMM International Conference on Multimedia Retrieval	/conf/mir	/conf/mir/icmr\n" +
  "B	ICMR	ACM SIGMM International Conference on Multimedia Retrieval	/conf/mir	/conf/mir/mir\n" +
  "B	SI3D	ACM Symposium on Interactive 3D Graphics	/conf/si3d	/conf/si3d/si3d\n" +
  "B	SCA	ACM/Eurographics Symposium on Computer Animation	/conf/sca	/conf/sca/sca\n" +
  "B	DCC	Data Compression Conference	/conf/dcc	/conf/dcc/dcc\n" +
  "B	EG	Eurographics	/conf/eurographics	/journals/cgf/cgf\n" +
  "B	EuroVis	Eurographics Conference on Visualization	/conf/vissym	/journals/cgf/cgf\n" +
  "B	SGP	Eurographics Symposium on Geometry Processing	/conf/sgp	/conf/sgp/sgp\n" +
  "B	EGSR	Eurographics Symposium on Rendering	/conf/rt	/conf/rt/dl\n" +
  "B	EGSR	Eurographics Symposium on Rendering	/conf/rt	/conf/rt/eii\n" +
  "B	ICASSP	IEEE International Conference on Acoustics,Speech and SP	/conf/icassp	/conf/icassp/icassp\n" +
  "B	ICME	IEEE International Conference on Multimedia& Expo	/conf/icmcs	/conf/icmcs/icme\n" +
  "B	ISMAR	International Symposium on Mixed and Augmented Reality	/conf/ismar	/conf/ismar/ismar\n" +
  "B	PG	Pacific Graphics: The Pacific Conference on Computer Graphics and Applications	/conf/pg	/conf/pg/pg\n" +
  "B	SPM	Symposium on Solid and Physical Modeling	/conf/sma	/conf/sma/spm\n" +
  "B	SPM	Symposium on Solid and Physical Modeling	/conf/sma	/conf/sma/sma\n" +
  "B	MICCAI	International Conference on Medical Image Computing and Computer-Assisted Intervention	/conf/miccai	/conf/miccai/miccai\n" +
  "C		ACM Symposium on Virtual Reality Software and Technology	/conf/vrst	/conf/vrst/vrst\n" +
  "C	CASA	Computer Animation and Social Agents	/conf/ca	/conf/ca/casa\n" +
  "C	CGI	Computer Graphics International	/conf/cgi	/conf/cgi/cgi\n" +
  "C	INTERSPEECH	Conference of the International SpeechCommunication Association	/conf/interspeech	/conf/interspeech/interspeech\n" +
  "C	GMP	Geometric Modeling and Processing	/conf/gmp	/conf/gmp/gmp\n" +
  "C	PacificVis	IEEE Pacific Visualization Symposium	/conf/apvis	/conf/apvis/pacificvis\n" +
  "C	PacificVis	IEEE Pacific Visualization Symposium	/conf/apvis	/conf/apvis/apvis\n" +
  "C	3DV	International Conference on 3D Vision	/conf/3dim	/conf/3dim/3dim\n" +
  "C	CAD/Graphics	International Conference on Computer-Aided Design and Computer Graphics	/conf/cadgraphics	/conf/cadgraphics/cadgraphics\n" +
  "C	ICIP	International Conference on Image Processing	/conf/icip	/conf/icip/icip\n" +
  "C	MMM	International Conference on Multimedia Modeling	/conf/mmm	/conf/mmm/mmm\n" +
  "C	PCM	Pacific-Rim Conference on Multimedia	/conf/pcm	/conf/pcm/pcm\n" +
  "C	SMI	Shape Modeling International	/conf/smi	/conf/smi/smi\n" +
  "C	ICVRV	International Conference on Virtual Reality and Visualization		\n" +
  "C	CVM	Computational Visual Media	/conf/cvm	/conf/cvm/cvm\n" +
  "C	PRCV	Chinese Conference on Pattern Recognition and Computer Vision	/conf/prcv	/conf/prcv/prcv\n" +
  "A	AI	Artificial Intelligence	/journals/ai	/journals/ai/ai\n" +
  "A	TPAMI	IEEE Trans on Pattern Analysis and Machine Intelligence	/journals/pami	/journals/pami/pami\n" +
  "A	IJCV	International Journal of Computer Vision	/journals/ijcv	/journals/ijcv/ijcv\n" +
  "A	JMLR	Journal of Machine Learning Research	/journals/jmlr	/journals/jmlr/jmlr\n" +
  "B	TAP	ACM Transactions on Applied Perception	/journals/tap	/journals/tap/tap\n" +
  "B	TSLP	ACM Transactions on Speech and Language Processing	/journals/tslp	/journals/tslp/tslp\n" +
  "B	AAMAS	Autonomous Agents and Multi-Agent Systems	/journals/aamas	/journals/aamas/aamas\n" +
  "B		Computational Linguistics	/journals/coling	/journals/coling/coling\n" +
  "B	CVIU	Computer Vision and Image Understanding	/journals/cviu	/journals/cviu/cviu\n" +
  "B	DKE	Data and Knowledge Engineering	/journals/dke	/journals/dke/dke\n" +
  "B		Evolutionary Computation	/journals/ec	/journals/ec/ec\n" +
  "B	TAC	IEEE Transactions on Affective Computing	/journals/taffco	/journals/taffco/taffco\n" +
  "B	TASLP	IEEE Transactions on Audio, Speech, and Language Processing	/journals/taslp	/journals/taslp/taslp\n" +
  "B		IEEE Transactions on Cybernetics	/journals/tcyb	/journals/tcyb/tcyb\n" +
  "B		IEEE Transactions on Cybernetics	/journals/tcyb	/journals/tsmc/tsmcb\n" +
  "B	TEC	IEEE Transactions on Evolutionary Computation	/journals/tec	/journals/tec/tec\n" +
  "B	TFS	IEEE Transactions on Fuzzy Systems	/journals/tfs	/journals/tfs/tfs\n" +
  "B	TNNLS	IEEE Transactions on Neural Networks and learning systems	/journals/tnn	/journals/tnn/tnn\n" +
  "B	IJAR	International Journal of Approximate Reasoning	/journals/ijar	/journals/ijar/ijar\n" +
  "B	JAIR	Journal of Artificial Intelligence Research	/journals/jair	/journals/jair/jair\n" +
  "B		Journal of Automated Reasoning	/journals/jar	/journals/jar/jar\n" +
  "B	JSLHR	Journal of Speech, Language, and Hearing Research		\n" +
  "B		Machine Learning	/journals/ml	/journals/ml/ml\n" +
  "B		Neural Computation	/journals/neco	/journals/neco/neco\n" +
  "B		Neural Networks	/journals/nn	/journals/nn/nn\n" +
  "B		Pattern Recognition	/journals/pr	/journals/pr/pr\n" +
  "B	TACL	Transactions of the Association for Computational Linguistics	/journals/tacl	/journals/tacl/tacl\n" +
  "C	TALLIP	ACM Transactions on Asian and Low-Resource Language Information Processing	/journals/talip	/journals/talip/talip\n" +
  "C		Applied Intelligence	/journals/apin	/journals/apin/apin\n" +
  "C	AIM	Artificial Intelligence in Medicine	/journals/artmed	/journals/artmed/artmed\n" +
  "C		Artificial Life	/journals/alife	/journals/alife/alife\n" +
  "C		Computational Intelligence	/journals/ci	/journals/ci/ci\n" +
  "C		Computer Speech and Language	/journals/csl	/journals/csl/csl\n" +
  "C		Connection Science	/journals/connection	/journals/connection/connection\n" +
  "C	DSS	Decision Support Systems	/journals/dss	/journals/dss/dss\n" +
  "C	EAAI	Engineering Applications of Artificial Intelligence	/journals/eaai	/journals/eaai/eaai\n" +
  "C		Expert Systems	/journals/es	/journals/es/es\n" +
  "C	ESWA	Expert Systems with Applications	/journals/eswa	/journals/eswa/eswa\n" +
  "C		Fuzzy Sets and Systems	/journals/fss	/journals/fss/fss\n" +
  "C	TG	IEEE Transactions on Games	/journals/tciaig	/journals/tciaig/tciaig\n" +
  "C	IET-CVI	IET Computer Vision	/journals/iet-cvi	/journals/iet-cvi/iet-cvi\n" +
  "C		IET Signal Processing	/journals/iet-spr	/journals/iet-spr/iet-spr\n" +
  "C	IVC	Image and Vision Computing	/journals/ivc	/journals/ivc/ivc\n" +
  "C	IDA	Intelligent Data Analysis	/journals/ida	/journals/ida/ida\n" +
  "C	IJCIA	International Journal of Computational Intelligence and Applications	/journals/ijcia	/journals/ijcia/ijcia\n" +
  "C	IJIS	International Journal of Intelligent Systems	/journals/ijis	/journals/ijis/ijis\n" +
  "C	IJNS	International Journal of Neural Systems	/journals/ijns	/journals/ijns/ijns\n" +
  "C	IJPRAI	International Journal of Pattern Recognition and Artificial Intelligence	/journals/ijprai	/journals/ijprai/ijprai\n" +
  "C	IJUFKS	International Journal of Uncertainty, Fuzziness and Knowledge-Based System	/journals/ijufks	/journals/ijufks/ijufks\n" +
  "C	IJDAR	International Journal on Document Analysis and Recognition	/journals/ijdar	/journals/ijdar/ijdar\n" +
  "C	JETAI	Journal of Experimental and Theoretical Artificial Intelligence	/journals/jetai	/journals/jetai/jetai\n" +
  "C	KBS	Knowledge-Based Systems	/journals/kbs	/journals/kbs/kbs\n" +
  "C		Machine Translation	/journals/mt	/journals/mt/mt\n" +
  "C		Machine Vision and Applications	/journals/mva	/journals/mva/mva\n" +
  "C		Natural Computing	/journals/nc	/journals/nc/nc\n" +
  "C	NLE	Natural Language Engineering	/journals/nle	/journals/nle/nle\n" +
  "C	NCA	Neural Computing & Applications	/journals/nca	/journals/nca/nca\n" +
  "C	NPL	Neural Processing Letters	/journals/npl	/journals/npl/npl\n" +
  "C		Neurocomputing	/journals/ijon	/journals/ijon/ijon\n" +
  "C	PAA	Pattern Analysis and Applications	/journals/paa	/journals/paa/paa\n" +
  "C	PRL	Pattern Recognition Letters	/journals/prl	/journals/prl/prl\n" +
  "C		Soft Computing	/journals/soco	/journals/soco/soco\n" +
  "C	WI	Web Intelligence	/journals/wias	/journals/wias/wias\n" +
  "C	TIIS	ACM Transactions on Interactive Intelligent Systems	/journals/tiis	/journals/tiis/tiis\n" +
  "A	AAAI	AAAI Conference on Artificial Intelligence	/conf/aaai	/conf/aaai/aaai\n" +
  "A	NeurIPS	Annual Conference on Neural Information Processing Systems	/conf/nips	/conf/nips/neurips\n" +
  "A	NeurIPS	Annual Conference on Neural Information Processing Systems	/conf/nips	/conf/nips/nips\n" +
  "A	ACL	Annual Meeting of the Association for Computational Linguistics	/conf/acl	/conf/acl/acl\n" +
  "A	CVPR	IEEE Conference on Computer Vision and Pattern Recognition	/conf/cvpr	/conf/cvpr/cvpr\n" +
  "A	ICCV	International Conference on Computer Vision	/conf/iccv	/conf/iccv/iccv\n" +
  "A	ICML	International Conference on Machine Learning	/conf/icml	/conf/icml/icml\n" +
  "A	IJCAI	International Joint Conference on Artificial Intelligence	/conf/ijcai	/conf/ijcai/ijcai\n" +
  "B	COLT	Annual Conference on Computational Learning Theory	/conf/colt	/conf/colt/colt\n" +
  "B	EMNLP	Conference on Empirical Methods in Natural Language Processing	/conf/emnlp	/conf/emnlp/emnlp\n" +
  "B	ECAI	European Conference on Artificial Intelligence	/conf/ecai	/conf/ecai/ecai\n" +
  "B	ECCV	European Conference on Computer Vision	/conf/eccv	/conf/eccv/eccv\n" +
  "B	ICRA	IEEE International Conference on Robotics and Automation	/conf/icra	/conf/icra/icra\n" +
  "B	ICAPS	International Conference on Automated Planning and Scheduling	/conf/aips	/conf/aips/icaps\n" +
  "B	ICCBR	International Conference on Case-Based Reasoning and Development	/conf/iccbr	/conf/iccbr/iccbr\n" +
  "B	COLING	International Conference on Computational Linguistics	/conf/coling	/conf/coling/coling\n" +
  "B	KR	International Conference on Principles of Knowledge Representation and Reasoning	/conf/kr	/conf/kr/kr\n" +
  "B	UAI	International Conference on Uncertainty in Artificial Intelligence	/conf/uai	/conf/uai/uai\n" +
  "B	AAMAS	International Joint Conference on Autonomous Agents and Multi-agent Systems	/conf/atal	/conf/atal/aamas\n" +
  "B	PPSN	Parallel Problem Solving from Nature	/conf/ppsn	/conf/ppsn/ppsn\n" +
  "B	NAACL	The Annual Conference of the North American Chapter of the Association for Computational Linguistics	/conf/naacl	/conf/naacl/naacl\n" +
  "C	AISTATS	Artificial Intelligence and Statistics	/conf/aistats	/conf/aistats/aistats\n" +
  "C	ACCV	Asian Conference on Computer Vision	/conf/accv	/conf/accv/accv\n" +
  "C	ACML	Asian Conference on Machine Learning	/conf/acml	/conf/acml/acml\n" +
  "C	BMVC	British Machine Vision Conference	/conf/bmvc	/conf/bmvc/bmvc\n" +
  "C	NLPCC	CCF International Conference on Natural Language Processing and Chinese Computing	/conf/nlpcc	/conf/nlpcc/nlpcc\n" +
  "C	CoNLL	Conference on Computational Natural Language Learning	/conf/conll	/conf/conll/conll\n" +
  "C	GECCO	Genetic and Evolutionary Computation Conference	/conf/gecco	/conf/gecco/gecco\n" +
  "C	ICTAI	IEEE International Conference on Tools with Artificial Intelligence	/conf/ictai	/conf/ictai/ictai\n" +
  "C	IROS	IEEERSJ International Conference on Intelligent Robots and Systems	/conf/iros	/conf/iros/iros\n" +
  "C	ALT	International Conference on Algorithmic Learning Theory	/conf/alt	/conf/alt/alt\n" +
  "C	ICANN	International Conference on Artificial Neural Networks	/conf/icann	/conf/icann/icann\n" +
  "C	FG	International Conference on Automatic Face and Gesture Recognition	/conf/fgr	/conf/fgr/fg\n" +
  "C	ICDAR	International Conference on Document Analysis and Recognition	/conf/icdar	/conf/icdar/icdar\n" +
  "C	ILP	International Conference on Inductive Logic Programming	/conf/ilp	/conf/ilp/ilp\n" +
  "C	KSEM	International conference on Knowledge Science,Engineering and Management	/conf/ksem	/conf/ksem/ksem\n" +
  "C	ICONIP	International Conference on Neural Information Processing	/conf/iconip	/conf/iconip/iconip\n" +
  "C	ICPR	International Conference on Pattern Recognition	/conf/icpr	/conf/icpr/icpr\n" +
  "C	ICB	International Joint Conference on Biometrics	/conf/icb	/conf/icb/icb\n" +
  "C	IJCNN	International Joint Conference on Neural Networks	/conf/ijcnn	/conf/ijcnn/ijcnn\n" +
  "C	PRICAI	Pacific Rim International Conference on Artificial Intelligence	/conf/pricai	/conf/pricai/pricai\n" +
  "A	TOCHI	ACM Transactions on Computer-Human Interaction	/journals/tochi	/journals/tochi/tochi\n" +
  "A	IJHCS	International Journal of Human Computer Studies	/journals/ijmms	/journals/ijmms/ijmms\n" +
  "B	CSCW	Computer Supported Cooperative Work	/journals/cscw	/journals/cscw/cscw\n" +
  "B	HCI	Human Computer Interaction	/journals/hhci	/journals/hhci/hhci\n" +
  "B		IEEE Transactions on Human-Machine Systems	/journals/thms	/journals/thms/thms\n" +
  "B		IEEE Transactions on Human-Machine Systems	/journals/thms	/journals/tsmc/tsmcc\n" +
  "B	IWC	Interacting with Computers	/journals/iwc	/journals/iwc/iwc\n" +
  "B	IJHCI	International Journal of Human-Computer Interaction	/journals/ijhci	/journals/ijhci/ijhci\n" +
  "B	UMUAI	User Modeling and User-Adapted Interaction	/journals/umuai	/journals/umuai/umuai\n" +
  "B	TSMC	IEEE Transactions on Systems, Man, and Cybernetics: Systems	/journals/tsmc	/journals/tsmc/tsmc\n" +
  "C	BIT	Behaviour & Information Technology	/journals/behaviourIT	/journals/behaviourIT/behaviourIT\n" +
  "C	PUC	Personal and Ubiquitous Computing	/journals/puc	/journals/puc/puc\n" +
  "C	PMC	Pervasive and Mobile Computing	/journals/percom	/journals/percom/percom\n" +
  "C	PACMHCI	Proceedings of the ACM on Human-Computer Interaction	/journals/pacmhci	/journals/pacmhci/pacmhci\n" +
  "A	CSCW	ACM Conference on Computer Supported Cooperative Work and Social Computing	/conf/cscw	/conf/cscw/cscw\n" +
  "A	CHI	ACM Conference on Human Factors in Computing Systems	/conf/chi	/conf/chi/chi\n" +
  "A	UbiComp	ACM International Conference on Ubiquitous Computing	/conf/huc	/conf/huc/ubicomp\n" +
  "A	IMWUT	Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies	/journals/imwut	/journals/imwut/imwut\n" +
  "A	UIST	ACM Symposium on User Interface Software and Technology	/conf/uist	/conf/uist/uist\n" +
  "B	GROUP	ACM Conference on Supporting Group Work	/conf/group	/conf/group/group\n" +
  "B	IUI	ACM International Conference on Intelligent User Interfaces	/conf/iui	/conf/iui/iui\n" +
  "B	ITS	ACM International Conference on Interactive Tabletops and Surfaces	/conf/tabletop	/conf/tabletop/iss\n" +
  "B	ITS	ACM International Conference on Interactive Tabletops and Surfaces	/conf/tabletop	/conf/tabletop/its\n" +
  "B	ECSCW	European Conference on Computer Supported Cooperative Work	/conf/ecscw	/conf/ecscw/ecscw\n" +
  "B	PERCOM	IEEE International Conference on Pervasive Computing and Communications	/conf/percom	/conf/percom/percom\n" +
  "B	MobileHCI	International Conference on Human Computer Interaction with Mobile Devices and Services	/conf/mhci	/conf/mhci/mhci\n" +
  "B	ICWSM	The International AAAI Conference on Web and Social Media	/conf/icwsm	/conf/icwsm/icwsm\n" +
  "C	DIS	ACM Conference on Designing Interactive Systems	/conf/ACMdis	/conf/ACMdis/ACMdis\n" +
  "C	ICMI	ACM International Conference on Multimodal Interaction	/conf/icmi	/conf/icmi/icmi\n" +
  "C	ASSETS	ACM SIGACCESS Conference on Computers and Accessibility	/conf/assets	/conf/assets/assets\n" +
  "C	GI	Graphics Interface conference	/conf/graphicsinterface	/conf/graphicsinterface/graphicsinterface\n" +
  "C	UIC	IEEE International Conference on Ubiquitous Intelligence and Computing	/conf/uic	/conf/uic/uic\n" +
  "C		IEEE World Haptics Conference	/conf/haptics	/conf/haptics/haptics\n" +
  "C	INTERACT	IFIP TC13 Conference on Human-Computer Interaction	/conf/interact	/conf/interact/interact\n" +
  "C	IDC	Interaction Design and Children	/conf/acmidc	/conf/acmidc/idc\n" +
  "C	CollaborateCom	International Conference on Collaborative Computing: Networking, Applications and Worksharing	/conf/colcom	/conf/colcom/colcom\n" +
  "C	CSCWD	International Conference on Computer Supported Cooperative Work in Design	/conf/cscwd	/conf/cscwd/cscwd\n" +
  "C	CoopIS	International Conference on Cooperative Information Systems	/conf/coopis	/conf/coopis/coopis\n" +
  "C	MobiQuitous	International Conference on Mobile and Ubiquitous Systems: Computing,Networking and Services	/conf/mobiquitous	/conf/mobiquitous/mobiquitous\n" +
  "C	AVI	International Working Conference on Advanced Visual Interfaces	/conf/avi	/conf/avi/avi\n" +
  "A 	JACM	Journal of the ACM	/journals/jacm	/journals/jacm/jacm\n" +
  "A 	Proc. IEEE	Proceedings of the IEEE	/journals/pieee	/journals/pieee/pieee\n" +
  "A	SCIS	Science China Information Sciences	/journals/chinaf	/journals/chinaf/chinaf\n" +
  "B		Bioinformatics	/journals/bioinformatics	/journals/bioinformatics/bioinformatics\n" +
  "B		Briefings in Bioinformatics	/journals/bib	/journals/bib/bib\n" +
  "B	Cognition	Cognition: International Journal of Cognitive Science		\n" +
  "B	TASAE	IEEE Transactions on Automation Science and Engineering	/journals/tase	/journals/tase/tase\n" +
  "B	TGARS	IEEE Transactions on Geoscience and Remote Sensing	/journals/tgrs	/journals/tgrs/tgrs\n" +
  "B	TITS	IEEE Transactions on Intelligent Transportation Systems	/journals/tits	/journals/tits/tits\n" +
  "B	TMI	IEEE Transactions on Medical Imaging	/journals/tmi	/journals/tmi/tmi\n" +
  "B	TR	IEEE Transactions on Robotics	/journals/trob	/journals/trob/trob\n" +
  "B	TCBB	IEEE-ACM Transactions on Computational Biology and Bioinformatics	/journals/tcbb	/journals/tcbb/tcbb\n" +
  "B	JCST	Journal of Computer Science and Technology	/journals/jcst	/journals/jcst/jcst\n" +
  "B	JAMIA	Journal of the American Medical Informatics Association	/journals/jamia	/journals/jamia/jamia\n" +
  "B		PLOS Computational Biology	/journals/ploscb	/journals/ploscb/ploscb\n" +
  "B		The Computer Journal	/journals/cj	/journals/cj/cj\n" +
  "B		World Wide Web Journal	/journals/www	/journals/www/www\n" +
  "B	FCS	Frontiers of Computer Science	/journals/fcsc	/journals/fcsc/fcsc\n" +
  "C		BMC Bioinformatics	/journals/bmcbi	/journals/bmcbi/bmcbi\n" +
  "C		Cybernetics and Systems	/journals/cas	/journals/cas/cas\n" +
  "C		IEEE Geoscience and Remote Sensing Letters	/journals/lgrs	/journals/lgrs/lgrs\n" +
  "C	JBHI	IEEE Journal of Biomedical and Health Informatics	/journals/titb	/journals/titb/titb\n" +
  "C	TBD	IEEE Transactions on Big Data	/journals/tbd	/journals/tbd/tbd\n" +
  "C		IET Intelligent Transport Systems		\n" +
  "C	JBI	Journal of Biomedical Informatics	/journals/jbi	/journals/jbi/jbi\n" +
  "C		Medical Image Analysis	/journals/mia	/journals/mia/mia\n" +
  "C	TII	IEEE Transactions on Industrial Informatics	/journals/tii	/journals/tii/tii\n" +
  "C	TCPS	ACM Transactions on Cyber-Physical Systems	/journals/tcps	/journals/tcps/tcps\n" +
  "C	TOCE	ACM Transactions on Computing Education	/journals/jeric	/journals/jeric/toce\n" +
  "C	TOCE	ACM Transactions on Computing Education	/journals/jeric	/journals/jeric/jeric\n" +
  "C	FITEE	Frontiers of Information Technology & Electronic Engineering	/journals/jzusc	/journals/jzusc/jzusc\n" +
  "C	TCSS	IEEE Transaction on Computational Social Systems	/journals/tcss	/journals/tcss/tcss\n" +
  "C		IEEE Transactions on Reliability	/journals/tr	/journals/tr/tr\n" +
  "A	WWW	International World Wide Web Conferences	/conf/www	/conf/www/www\n" +
  "A	RTSS	Real-Time Systems Symposium	/conf/rtss	/conf/rtss/rtss\n" +
  "A	WINE	Conference on Web and Internet Economics	/conf/wine	/conf/wine/wine\n" +
  "B	CogSci	Cognitive Science Society Annual Conference	/conf/cogsci	/conf/cogsci/cogsci\n" +
  "B	BIBM	IEEE International Conference on Bioinformatics and Biomedicine	/conf/bibm	/conf/bibm/bibm\n" +
  "B	EMSOFT	International Conference on Embedded Software	/conf/emsoft	/conf/emsoft/emsoft\n" +
  "B	ISMB	International conference on Intelligent Systems for Molecular Biology	/journals/bioinformatics	/journals/bioinformatics/bioinformatics\n" +
  "B	RECOMB	International Conference on Research in Computational Molecular Biology	/conf/recomb	/conf/recomb/recomb\n" +
  "C	AMIA	American Medical Informatics Association Annual Symposium	/conf/amia	/conf/amia/amia\n" +
  "C	APBC	Asia Pacific Bioinformatics Conference	/conf/apbc	/conf/apbc/apbc\n" +
  "C		IEEE International Conference on Big Data	/conf/bigdataconf	/conf/bigdataconf/bigdataconf\n" +
  "C		IEEE International Conference on Cloud Computing	/conf/IEEEcloud	/conf/IEEEcloud/IEEEcloud\n" +
  "C	SMC	IEEE International Conference on Systems, Man, and Cybernetics	/conf/smc	/conf/smc/smc\n" +
  "C	COSIT	International Conference on Spatial Information Theory	/conf/cosit	/conf/cosit/cosit\n" +
  "C	ISBRA	International Symposium on Bioinformatics Research and Applications	/conf/isbra	/conf/isbra/isbra\n" +
  "C	SAGT	International Symposium on Algorithmic Game Theory	/conf/sagt	/conf/sagt/sagt\n" +
  "C	SIGSPATIAL	ACM SIGSPATIAL International Conference on Advances in Geographic Information Systems	/conf/gis	/conf/gis/gis\n" +
  "C	ICIC	International Conference on Intelligent Computing	/conf/icic	/conf/icic/icic\n" +
  "E	ICLR	International Conference on Learning Representations	/conf/iclr	/conf/iclr/iclr\n" +
  "P		arXiv	/journals/corr	/journals/corr/corr";

var ccfRankFull = {};
var ccfRankAbbr = {};
var ccfRankDb = {};
var ccfRankUrl = {};
var ccfFullUrl = {};
var ccfAbbrFull = {};
for (x of ccfRankList.split("\n")) {
  y = x.split("\t");
  ccfFullUrl[y[2].toUpperCase()] = y[4];
  if (y[4] != "") {
    ccfRankUrl[y[4]] = y[0];
    ccfRankAbbr[y[4]] = y[1];
    ccfRankFull[y[4]] = y[2];
    ccfRankDb[y[3]] = y[4];
    ccfAbbrFull[y[1]] = y[2].toUpperCase();
  }
}

const copyright = `/**
 * MIT License
 *  
 * WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 * Copyright (c) 2019-2024 All Rights Reserved.
 * ------------------------------------------------------
 * Generated by dataGen.js
 * Last updated: ${new Date().toISOString().split("T")[0]}
 */
`;

const fs = require("fs");

// Helper function to write formatted JS files
function writeFormattedJS(filename, objName, data) {
  const content = `${copyright}
ccf.${objName} = ${JSON.stringify(data, null, 2)};
`;
  fs.writeFileSync(filename, content, "utf8");
}

// Write all files with consistent formatting and copyright
writeFormattedJS("ccfRankAbbr.js", "rankAbbrName", ccfRankAbbr);
writeFormattedJS("ccfRankFull.js", "rankFullName", ccfRankFull);
writeFormattedJS("ccfRankDb.js", "rankDb", ccfRankDb);
writeFormattedJS("ccfRankUrl.js", "rankUrl", ccfRankUrl);
writeFormattedJS("ccfFullUrl.js", "fullUrl", ccfFullUrl);
writeFormattedJS("ccfAbbrFull.js", "abbrFull", ccfAbbrFull);
