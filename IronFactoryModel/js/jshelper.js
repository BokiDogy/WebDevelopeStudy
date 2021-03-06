var $$ = (x) => [].slice.call(x); //将对象转化为数组
//数组元素移动

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
Array.prototype.move2 = function (pos1, pos2) {
    // local variables
    var i, tmp;
    // cast input parameters to integers
    pos1 = parseInt(pos1, 10);
    pos2 = parseInt(pos2, 10);
    // if positions are different and inside array
    if (pos1 !== pos2 && 0 <= pos1 && pos1 <= this.length && 0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
            for (i = pos1; i < pos2; i++) {
                this[i] = this[i + 1];
            }
        }
        // move element up and shift other elements down
        else {
            for (i = pos1; i > pos2; i--) {
                this[i] = this[i - 1];
            }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
    }
}


function move(arr, oldIndex, newIndex) {
    if (newIndex >= arr.length) {
        var k = newIndex - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
};

//上移一层
function up(arr, indexes) {
    //indexes必须由大到小，所以得排序
    indexes.sort();
    indexes.reverse();

    //调换位置
    for (var i = 0; i < indexes.length; i++) {
        var index = indexes[i];
        move(arr, index, index + 1);
    }

    //去掉undefined
    var result = new Array();
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item != undefined) {
            result.push(item);
        }
    }

    return result;
}

//置顶
function ceil(arr, indexes) {
    //indexes必须由小到大，所以得排序
    indexes.sort();

    for (var i = 0; i < indexes.length; i++) {
        var index = indexes[i];
        move(arr, index - i, arr.length - 1);
    }

    return arr;
}
//

String.prototype.splice = function(start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};



var t = {
    a: "啊阿锕埃挨哎唉哀皑癌蔼矮艾碍爱隘诶捱嗳嗌嫒瑷暧砹锿霭鞍氨安俺按暗岸胺案谙埯揞犴庵桉铵鹌顸黯肮昂盎凹敖熬翱袄傲奥懊澳坳拗嗷噢岙廒遨媪骜聱螯鏊鳌鏖",
    b: "芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸茇菝萆捭岜灞杷钯粑鲅魃白柏百摆佰败拜稗薜掰鞴斑班搬扳般颁板版扮拌伴瓣半办绊阪坂豳钣瘢癍舨邦帮梆榜膀绑棒磅蚌镑傍谤蒡螃苞胞包褒雹保堡饱宝抱报暴豹鲍爆勹葆宀孢煲鸨褓趵龅剥薄玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳亳蕃啵饽檗擘礴钹鹁簸跛杯碑悲卑北辈背贝钡倍狈备惫焙被孛陂邶埤蓓呗怫悖碚鹎褙鐾奔苯本笨畚坌锛崩绷甭泵蹦迸唪嘣甏逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛匕仳俾芘荜荸吡哔狴庳愎滗濞弼妣婢嬖璧贲畀铋秕裨筚箅篦舭襞跸髀鞭边编贬扁便变卞辨辩辫遍匾弁苄忭汴缏煸砭碥稹窆蝙笾鳊标彪膘表婊骠飑飙飚灬镖镳瘭裱鳔鳖憋别瘪蹩鳘彬斌濒滨宾摈傧浜缤玢殡膑镔髌鬓兵冰柄丙秉饼炳病并禀邴摒绠枋槟燹捕卜哺补埠不布步簿部怖拊卟逋瓿晡钚醭髟",
    c: "擦嚓礤猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿骖璨粲黪苍舱仓沧藏伧操糙槽曹草艹嘈漕螬艚厕策侧册测刂帻恻层蹭噌插叉茬茶查碴搽察岔差诧猹馇汊姹杈楂槎檫钗锸镲衩拆柴豺侪茈瘥虿龇搀掺蝉馋谗缠铲产阐颤冁谄谶蒇廛忏潺澶孱羼婵嬗骣觇禅镡裣蟾躔昌猖场尝常长偿肠厂敞畅唱倡伥鬯苌菖徜怅惝阊娼嫦昶氅鲳超抄钞朝嘲潮巢吵炒怊绉晁耖车扯撤掣彻澈坼屮砗郴臣辰尘晨忱沉陈趁衬称谌抻嗔宸琛榇肜胂碜龀撑城橙成呈乘程惩澄诚承逞骋秤埕嵊徵浈枨柽樘晟塍瞠铖裎蛏酲吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽傺墀芪茌搋叱哧啻嗤彳饬沲媸敕胝眙眵鸱瘛褫蚩螭笞篪豉踅踟魑充冲虫崇宠茺忡憧铳艟抽酬畴踌稠愁筹仇绸瞅丑俦圳帱惆溴妯瘳雠鲋臭初出橱厨躇锄雏滁除楚础储矗搐触处亍刍憷绌杵楮樗蜍蹰黜揣川穿椽传船喘串掾舛惴遄巛氚钏镩舡疮窗幢床闯创怆吹炊捶锤垂陲棰槌春椿醇唇淳纯蠢促莼沌肫朐鹑蝽戳绰蔟辶辍镞踔龊疵茨磁雌辞慈瓷词此刺赐次荠呲嵯鹚螅糍趑聪葱囱匆从丛偬苁淙骢琮璁枞凑粗醋簇猝殂蹙蹿篡窜汆撺昕爨摧崔催脆瘁粹淬翠萃悴璀榱隹村存寸磋忖皴撮搓措挫错厝脞锉矬痤鹾蹉躜薮楱辏腠嘬膪踹岑涔",
    d: "搭达答瘩打大耷哒嗒怛妲疸褡笪靼鞑呆歹傣戴带殆代贷袋待逮怠埭甙呔岱迨逯骀绐玳黛耽担丹单郸掸胆旦氮但惮淡诞弹蛋亻儋卩萏啖澹檐殚赕眈瘅聃箪当挡党荡档谠凼菪宕砀铛裆刀捣蹈倒岛祷导到稻悼道盗叨啁忉洮氘焘忑纛德得的锝蹬灯登等瞪凳邓噔嶝戥磴镫簦堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔氐籴诋谛邸坻莜荻嘀娣柢棣觌砥碲睇镝羝骶颠掂滇碘点典靛垫电佃甸店惦奠淀殿丶阽坫埝巅玷癜癫簟踮碉叼雕凋刁掉吊钓调轺铞蜩粜貂跌爹碟蝶迭谍叠佚垤堞揲喋渫轶牒瓞褶耋蹀鲽鳎丁盯叮钉顶鼎锭定订丢仃啶玎腚碇町铤疔耵酊东冬董懂动栋侗恫冻洞垌咚岽峒夂氡胨胴硐鸫兜抖斗陡豆逗痘蔸钭窦窬蚪篼酡都督毒犊独读堵睹赌杜镀肚度渡妒芏嘟渎椟橐牍蠹笃髑黩端短锻段断缎彖椴煅簖堆兑队对怼憝碓墩吨蹲敦顿囤钝盾遁炖砘礅盹镦趸掇哆多夺垛躲朵跺舵剁惰堕咄哚缍柁铎裰踱嗲铥",
    e: "蛾峨鹅俄额讹娥恶厄扼遏鄂饿噩谔垩垭苊莪萼呃愕屙婀轭曷腭硪锇锷鹗颚鳄恩蒽摁唔嗯而儿耳尔饵洱二贰迩珥铒鸸鲕",
    f: "发罚筏伐乏阀法珐垡砝藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛蘩幡犭梵攵燔畈蹯坊芳方肪房防妨仿访纺放匚邡彷钫舫鲂菲非啡飞肥匪诽吠肺废沸费芾狒悱淝妃绋绯榧腓斐扉祓砩镄痱蜚篚翡霏鲱芬酚吩氛分纷坟焚汾粉奋份忿愤粪偾瀵棼愍鲼鼢丰封枫蜂峰锋风疯烽逢冯缝讽奉凤俸酆葑沣砜佛否夫敷肤孵扶拂辐幅氟符伏俘服浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐匐凫郛芙苻茯莩菔呋幞滏艴孚驸绂桴赙黻黼罘稃馥虍蚨蜉蝠蝮麸趺跗鳆缶",
    g: "噶嘎蛤尬呷尕尜旮钆该改概钙盖溉丐陔垓戤赅胲干甘杆柑竿肝赶感秆敢赣坩苷尴擀泔淦澉绀橄旰矸疳酐冈刚钢缸肛纲岗港戆罡颃筻杠工攻功恭龚供躬公宫弓巩汞拱贡共蕻廾咣珙肱蚣蛩觥篙皋高膏羔糕搞镐稿告睾诰郜蒿藁缟槔槁杲锆哥歌搁戈鸽胳疙割革葛格阁隔铬个各鬲仡哿塥嗝纥搿膈硌铪镉袼颌虼舸骼髂给根跟亘茛哏艮耕更庚羹埂耿梗哽赓鲠钩勾沟苟狗垢构购够佝诟岣遘媾缑觏彀鸲笱篝鞲辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇嘏诂菰哌崮汩梏轱牯牿胍臌毂瞽罟钴锢瓠鸪鹄痼蛄酤觚鲴骰鹘刮瓜剐寡挂褂卦诖呱栝鸹乖拐怪哙棺关官冠观管馆罐惯灌贯倌莞掼涫盥鹳鳏光广逛犷桄胱疒瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽匦刿庋宄妫桧炅晷皈簋鲑鳜辊滚棍丨衮绲磙鲧锅郭国果裹过馘蠃埚掴呙囗帼崞猓椁虢锞聒蜮蜾蝈",
    h: "哈骸孩海氦亥害骇咴嗨颏醢酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉邗菡撖阚瀚晗焓颔蚶鼾夯痕很狠恨杭航沆绗珩桁壕嚎豪毫郝好耗号浩薅嗥嚆濠灏昊皓颢蚝呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺诃劾壑藿嗑嗬阖盍蚵翮嘿黑哼亨横衡恒訇蘅轰哄烘虹鸿洪宏弘红黉讧荭薨闳泓喉侯猴吼厚候后堠後逅瘊篌糇鲎骺呼乎忽瑚壶葫胡蝴狐糊湖弧虎唬护互沪户冱唿囫岵猢怙惚浒滹琥槲轷觳烀煳戽扈祜鹕鹱笏醐斛花哗华猾滑画划化话劐浍骅桦铧稞槐徊怀淮坏还踝欢环桓缓换患唤痪豢焕涣宦幻郇奂垸擐圜洹浣漶寰逭缳锾鲩鬟荒慌黄磺蝗簧皇凰惶煌晃幌恍谎隍徨湟潢遑璜肓癀蟥篁鳇灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘诙茴荟蕙哕喙隳洄彗缋珲晖恚虺蟪麾荤昏婚魂浑混诨馄阍溷缗豁活伙火获或惑霍货祸攉嚯夥钬锪镬耠蠖",
    j: "击圾基机畸稽积箕肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪居丌乩剞佶佴脔墼芨芰萁蒺蕺掎叽咭哜唧岌嵴洎彐屐骥畿玑楫殛戟戢赍觊犄齑矶羁嵇稷瘠瘵虮笈笄暨跻跽霁鲚鲫髻麂嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁伽郏拮岬浃迦珈戛胛恝铗镓痂蛱笳袈跏歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件健舰剑饯渐溅涧建僭谏谫菅蒹搛囝湔蹇謇缣枧柙楗戋戬牮犍毽腱睑锏鹣裥笕箴翦趼踺鲣鞯僵姜将浆江疆蒋桨奖讲匠酱降茳洚绛缰犟礓耩糨豇蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫佼僬茭挢噍峤徼姣纟敫皎鹪蛟醮跤鲛窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届偈讦诘喈嗟獬婕孑桀獒碣锴疖袷颉蚧羯鲒骱髫巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸尽卺荩堇噤馑廑妗缙瑾槿赆觐钅锓衿矜劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净刭儆阱菁獍憬泾迳弪婧肼胫腈旌炯窘冂迥扃揪究纠玖韭久灸九酒厩救旧臼舅咎就疚僦啾阄柩桕鹫赳鬏鞠拘狙疽驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧倨讵苣苴莒掬遽屦琚枸椐榘榉橘犋飓钜锔窭裾趄醵踽龃雎鞫捐鹃娟倦眷卷绢鄄狷涓桊蠲锩镌隽撅攫抉掘倔爵觉决诀绝厥劂谲矍蕨噘崛獗孓珏桷橛爝镢蹶觖均菌钧军君峻俊竣浚郡骏捃狻皲筠麇",
    k: "喀咖卡佧咔胩咯坷苛柯棵磕颗科壳咳可渴克刻客课岢恪溘骒缂珂轲氪瞌钶疴窠蝌髁开揩楷凯慨剀垲蒈忾恺铠锎刊堪勘坎砍看侃凵莰莶戡龛瞰康慷糠扛抗亢炕坑伉闶钪考拷烤靠尻栲犒铐肯啃垦恳垠裉颀吭忐铿空恐孔控倥崆箜抠口扣寇芤蔻叩眍筘枯哭窟苦酷库裤刳堀喾绔骷夸垮挎跨胯侉块筷侩快蒯郐蒉狯脍宽款髋匡筐狂框矿眶旷况诓诳邝圹夼哐纩贶亏盔岿窥葵奎魁傀馈愧溃馗匮夔隗揆喹喟悝愦阕逵暌睽聩蝰篑臾跬坤昆捆困悃阃琨锟醌鲲髡括扩廓阔蛞",
    l: "垃拉喇蜡腊辣啦剌摺邋旯砬瘌莱来赖崃徕涞濑赉睐铼癞籁蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥啉岚懔漤榄斓罱镧褴琅榔狼廊郎朗浪莨蒗啷阆锒稂螂捞劳牢老佬姥酪烙涝唠崂栳铑铹痨醪勒乐肋仂叻嘞泐鳓雷镭蕾磊累儡垒擂类泪羸诔荽咧漯嫘缧檑耒酹棱冷拎玲菱零龄铃伶羚凌灵陵岭领另令酃塄苓呤囹泠绫柃棂瓴聆蛉翎鲮楞愣厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐痢立粒沥隶力璃哩俪俚郦坜苈莅蓠藜捩呖唳喱猁溧澧逦娌嫠骊缡珞枥栎轹戾砺詈罹锂鹂疠疬蛎蜊蠡笠篥粝醴跞雳鲡鳢黧俩联莲连镰廉怜涟帘敛脸链恋炼练挛蔹奁潋濂娈琏楝殓臁膦裢蠊鲢粮凉梁粱良两辆量晾亮谅墚椋踉靓魉撩聊僚疗燎寥辽潦了撂镣廖料蓼尥嘹獠寮缭钌鹩耢列裂烈劣猎冽埒洌趔躐鬣琳林磷霖临邻鳞淋凛赁吝蔺嶙廪遴檩辚瞵粼躏麟溜琉榴硫馏留刘瘤流柳六抡偻蒌泖浏遛骝绺旒熘锍镏鹨鎏龙聋咙笼窿隆垄拢陇弄垅茏泷珑栊胧砻癃楼娄搂篓漏陋喽嵝镂瘘耧蝼髅芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮垆摅撸噜泸渌漉璐栌橹轳辂辘氇胪镥鸬鹭簏舻鲈驴吕铝侣旅履屡缕虑氯律率滤绿捋闾榈膂稆褛峦孪滦卵乱栾鸾銮掠略锊轮伦仑沦纶论囵萝螺罗逻锣箩骡裸落洛骆络倮荦摞猡泺椤脶镙瘰雒",
    m: "妈麻玛码蚂马骂嘛吗唛犸嬷杩麽埋买麦卖迈脉劢荬咪霾瞒馒蛮满蔓曼慢漫谩墁幔缦熳镘颟螨鳗鞔芒茫盲忙莽邙漭朦硭蟒氓萌蒙檬盟锰猛梦孟勐甍瞢懵礞虻蜢蠓艋艨黾猫苗描瞄藐秒渺庙妙喵邈缈缪杪淼眇鹋蜱茅锚毛矛铆卯茂冒帽貌贸侔袤勖茆峁瑁昴牦耄旄懋瞀蛑蝥蟊髦么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚坶莓嵋猸浼湄楣镅鹛袂魅门闷们扪玟焖懑钔眯醚靡糜迷谜弥米秘觅泌蜜密幂芈冖谧蘼嘧猕獯汨宓弭脒敉糸縻麋棉眠绵冕免勉娩缅面沔湎腼眄蔑灭咩蠛篾民抿皿敏悯闽苠岷闵泯珉明螟鸣铭名命冥茗溟暝瞑酩摸摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谟茉蓦馍嫫镆秣瘼耱蟆貊貘谋牟某厶哞婺眸鍪拇牡亩姆母墓暮幕募慕木目睦牧穆仫苜呒沐毪钼",
    n: "拿哪呐钠那娜纳内捺肭镎衲箬氖乃奶耐奈鼐艿萘柰南男难囊喃囡楠腩蝻赧挠脑恼闹孬垴猱瑙硇铙蛲淖呢讷馁嫩能枘恁妮霓倪泥尼拟你匿腻逆溺伲坭猊怩滠昵旎祢慝睨铌鲵蔫拈年碾撵捻念廿辇黏鲇鲶娘酿鸟尿茑嬲脲袅捏聂孽啮镊镍涅乜陧蘖嗫肀颞臬蹑您柠狞凝宁拧泞佞蓥咛甯聍牛扭钮纽狃忸妞蚴脓浓农侬奴努怒呶帑弩胬孥驽女恧钕衄暖虐疟谑挪懦糯诺傩搦喏锘攮哝囔馕曩耨",
    o: "哦欧鸥殴藕呕偶沤怄瓯耦喔",
    p: "啪趴爬帕怕琶葩筢拍排牌徘湃派俳蒎攀潘盘磐盼畔判叛爿泮袢襻蟠蹒乓庞旁耪胖滂逄抛咆刨炮袍跑泡匏狍庖脬疱呸胚培裴赔陪配佩沛掊辔帔淠旆锫醅霈喷盆湓砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯堋嘭怦蟛砒霹批披劈琵毗啤脾疲皮匹痞僻屁譬丕陴邳郫圮鼙擗噼庀媲纰枇甓睥罴铍痦癖疋蚍貔篇偏片骗谝骈犏胼褊翩蹁飘漂瓢票剽嘌嫖缥殍瞟螵撇瞥丿苤氕拼频贫品聘拚姘嫔榀牝颦乒坪苹萍平凭瓶评屏俜娉枰鲆坡泼颇婆破魄迫粕叵鄱溥珀钋钷皤笸剖裒踣扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑匍噗濮璞氆镤镨蹼",
    q: "期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫亟亓圻芑萋葺嘁屺岐汔淇骐绮琪琦杞桤槭欹祺憩碛蛴蜞綦綮趿蹊鳍麒掐恰洽葜牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉佥阡芊芡荨掮岍悭慊骞搴褰缱椠肷愆钤虔箝枪呛腔羌墙蔷强抢嫱樯戗炝锖锵镪襁蜣羟跫跄橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍劁诮谯荞愀憔缲樵毳硗跷鞒切茄且怯窃郄唼惬妾挈锲箧钦侵亲秦琴勤芹擒禽寝沁芩蓁蕲揿吣嗪噙溱檎螓衾青轻氢倾卿清擎晴氰情顷请庆倩苘圊檠磬蜻罄箐謦鲭黥琼穷邛茕穹筇銎秋丘邱球求囚酋泅俅氽巯艽犰湫逑遒楸赇鸠虬蚯蝤裘糗鳅鼽趋区蛆曲躯屈驱渠取娶龋趣去诎劬蕖蘧岖衢阒璩觑氍祛磲癯蛐蠼麴瞿黢圈颧权醛泉全痊拳犬券劝诠荃獾悛绻辁畎铨蜷筌鬈缺炔瘸却鹊榷确雀阙悫裙群逡",
    r: "然燃冉染苒髯瓤壤攘嚷让禳穰饶扰绕荛娆桡惹若弱热偌壬仁人忍韧任认刃妊纫仞荏葚饪轫稔衽扔仍日戎茸蓉荣融熔溶容绒冗嵘狨缛榕蝾揉柔肉糅蹂鞣茹蠕儒孺如辱乳汝入褥蓐薷嚅洳溽濡铷襦颥软阮朊蕊瑞锐芮蕤睿蚋闰润",
    s: "撒洒萨卅仨挲飒腮鳃塞赛噻三叁伞散彡馓氵毵糁霰桑嗓丧搡磉颡搔骚扫嫂埽臊瘙鳋瑟色涩啬铩铯穑森僧莎砂杀刹沙纱傻啥煞脎歃痧裟霎鲨筛晒酾珊苫杉山删煽衫闪陕擅赡膳善汕扇缮剡讪鄯埏芟潸姗骟膻钐疝蟮舢跚鳝墒伤商赏晌上尚裳垧绱殇熵觞梢捎稍烧芍勺韶少哨邵绍劭苕潲蛸笤筲艄奢赊蛇舌舍赦摄射慑涉社设厍佘猞畲麝砷申呻伸身深娠绅神沈审婶甚肾慎渗诜谂吲哂渖椹矧蜃声生甥牲升绳省盛剩胜圣丞渑媵眚笙师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试谥埘莳蓍弑唑饣轼耆贳炻礻铈铊螫舐筮豕鲥鲺收手首守寿授售受瘦兽扌狩绶艏蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱恕倏塾菽忄沭涑澍姝纾毹腧殳镯秫鹬刷耍唰涮摔衰甩帅蟀栓拴闩霜双爽孀谁水睡税吮瞬顺舜恂说硕朔烁蒴搠嗍濯妁槊铄斯撕嘶思私司丝死肆寺嗣四伺似饲巳厮俟兕菥咝汜泗澌姒驷缌祀祠锶鸶耜蛳笥松耸怂颂送宋讼诵凇菘崧嵩忪悚淞竦搜艘擞嗽叟嗖嗾馊溲飕瞍锼螋苏酥俗素速粟僳塑溯宿诉肃夙谡蔌嗉愫簌觫稣酸蒜算虽隋随绥髓碎岁穗遂隧祟蓑冫谇濉邃燧眭睢孙损笋荪狲飧榫跣隼梭唆缩琐索锁所唢嗦娑桫睃羧",
    t: "塌他它她塔獭挞蹋踏闼溻遢榻沓胎苔抬台泰酞太态汰邰薹肽炱钛跆鲐坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭郯蕈昙钽锬覃汤塘搪堂棠膛唐糖傥饧溏瑭铴镗耥螗螳羰醣倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套挑鼗啕韬饕特藤腾疼誊滕梯剔踢锑提题蹄啼体替嚏惕涕剃屉荑悌逖绨缇鹈裼醍天添填田甜恬舔腆掭忝阗殄畋钿蚺条迢眺跳佻祧铫窕龆鲦贴铁帖萜餮厅听烃汀廷停亭庭挺艇莛葶婷梃蜓霆通桐酮瞳同铜彤童桶捅筒统痛佟僮仝茼嗵恸潼砼偷投头透亠凸秃突图徒途涂屠土吐兔堍荼菟钍酴湍团疃推颓腿蜕褪退忒煺吞屯臀饨暾豚窀拖托脱鸵陀驮驼椭妥拓唾乇佗坨庹沱柝砣箨舄跎鼍",
    w: "挖哇蛙洼娃瓦袜佤娲腽歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕剜芄苋菀纨绾琬脘畹蜿箢汪王亡枉网往旺望忘妄罔尢惘辋魍威巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫倭偎诿隈葳薇帏帷崴嵬猥猬闱沩洧涠逶娓玮韪軎炜煨熨痿艉鲔瘟温蚊文闻纹吻稳紊问刎愠阌汶璺韫殁雯嗡翁瓮蓊蕹挝蜗涡窝我斡卧握沃莴幄渥杌肟龌巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误兀仵阢邬圬芴庑怃忤浯寤迕妩骛牾焐鹉鹜蜈鋈鼯",
    x: "昔熙析西硒矽晰嘻吸锡牺稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细僖兮隰郗茜葸蓰奚唏徙饩阋浠淅屣嬉玺樨曦觋欷熹禊禧钸皙穸蜥蟋舾羲粞翕醯鼷瞎虾匣霞辖暇峡侠狭下厦夏吓掀葭嗄狎遐瑕硖瘕罅黠锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线冼藓岘猃暹娴氙祆鹇痫蚬筅籼酰跹相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象芗葙饷庠骧缃蟓鲞飨萧硝霄削哮嚣销消宵淆晓小孝校肖啸笑效哓咻崤潇逍骁绡枭枵筱箫魈楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑偕亵勰燮薤撷廨瀣邂绁缬榭榍歙躞薪芯锌欣辛新忻心信衅囟馨莘歆铽鑫星腥猩惺兴刑型形邢行醒幸杏性姓陉荇荥擤悻硎兄凶胸匈汹雄熊芎休修羞朽嗅锈秀袖绣莠岫馐庥鸺貅髹墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续讴诩圩蓿怵洫溆顼栩煦砉盱胥糈醑轩喧宣悬旋玄选癣眩绚儇谖萱揎馔泫洵渲漩璇楦暄炫煊碹铉镟痃靴薛学穴雪血噱泶鳕勋熏循旬询寻驯巡殉汛训讯逊迅巽埙荀薰峋徇浔曛窨醺鲟",
    y: "压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶伢揠吖岈迓娅琊桠氩砑睚痖焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验厣靥赝俨偃兖讠谳郾鄢芫菸崦恹闫阏洇湮滟妍嫣琰晏胭腌焱罨筵酽魇餍鼹殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾徉怏泱炀烊恙蛘鞅邀腰妖瑶摇尧遥窑谣姚咬舀药要耀夭爻吆崾徭瀹幺珧杳曜肴鹞窈繇鳐椰噎耶爷野冶也页掖业叶曳腋夜液谒邺揶馀晔烨铘一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎刈劓佾诒圪圯埸懿苡薏弈奕挹弋呓咦咿噫峄嶷猗饴怿怡悒漪迤驿缢殪贻旖熠钇镒镱痍瘗癔翊衤蜴舣羿翳酏黟茵荫因殷音阴姻吟银淫寅饮尹引隐印胤鄞堙茚喑狺夤氤铟瘾蚓霪龈英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映嬴郢茔莺萦撄嘤膺滢潆瀛瑛璎楹鹦瘿颍罂哟唷拥佣臃痈庸雍踊蛹咏泳涌永恿勇用俑壅墉慵邕镛甬鳙饔幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼卣攸侑莸呦囿宥柚猷牖铕疣蝣鱿黝鼬迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉浴寓裕预豫驭禺毓伛俣谀谕萸蓣揄喁圄圉嵛狳饫庾阈妪妤纡瑜昱觎腴欤於煜燠聿钰鹆瘐瘀窳蝓竽舁雩龉鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院塬沅媛瑗橼爰眢鸢螈鼋曰约越跃钥岳粤月悦阅龠樾刖钺耘云郧匀陨允运蕴酝晕韵孕郓芸狁恽纭殒昀氲",
    z: "匝砸杂拶咂栽哉灾宰载再在咱崽甾攒暂赞瓒昝簪糌趱錾赃脏葬奘戕臧遭糟凿藻枣早澡蚤躁噪造皂灶燥唣缫责择则泽仄赜啧迮昃笮箦舴贼怎谮增憎曾赠缯甑罾锃扎喳渣札轧铡闸眨栅榨咋乍炸诈揸吒咤哳怍砟痄蚱齄摘斋宅窄债寨砦瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽谵搌旃樟章彰漳张掌涨杖丈帐账仗胀瘴障仉鄣幛嶂獐嫜璋蟑招昭找沼赵照罩兆肇召爪诏棹钊笊遮折哲蛰辙者锗蔗这浙谪陬柘辄磔鹧褚蜇赭珍斟真甄砧臻贞针侦枕疹诊震振镇阵缜桢榛轸赈胗朕祯畛鸩蒸挣睁征狰争怔整拯正政帧症郑证诤峥钲铮筝芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒卮陟郅埴芷摭帙忮彘咫骘栉枳栀桎轵轾攴贽膣祉祗黹雉鸷痣蛭絷酯跖踬踯豸觯中盅忠钟衷终种肿重仲众冢锺螽舂舯踵舟周州洲诌粥轴肘帚咒皱宙昼骤啄着倜诹荮鬻纣胄碡籀舳酎鲷珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑住注祝驻伫侏邾苎茱洙渚潴驺杼槠橥炷铢疰瘃蚰竺箸翥躅麈抓拽专砖转撰赚篆抟啭颛桩庄装妆撞壮状丬椎锥追赘坠缀萑骓缒谆准捉拙卓桌琢茁酌灼浊倬诼廴蕞擢啜浞涿杓焯禚斫兹咨资姿滋淄孜紫仔籽滓子自渍字谘嵫姊孳缁梓辎赀恣眦锱秭耔笫粢觜訾鲻髭鬃棕踪宗综总纵腙粽邹走奏揍鄹鲰租足卒族祖诅阻组俎菹啐徂驵蹴钻纂攥缵嘴醉最罪尊遵撙樽鳟昨左佐柞做作坐座阝阼胙祚酢"
};
String.prototype.toPinYin = function() {
    return function(e) {
        for (var r = e.length, n = "", i = new RegExp("[a-zA-Z0-9- ]"), o = 0; o < r; o++) {
            var a = e.substr(o, 1)
              , f = function(e, r) {
                for (var n in t)
                    if (-1 != t[n].indexOf(e))
                        return function(t) {
                            if (t.length > 0)
                                return t.toUpperCase() + ""
                        }(n);
                return !1
            }(a);
            i.test(a) ? n += a : !1 !== f && (n += f)
        }
        for (n = n.replace(/ /g, "-"); n.indexOf("--") > 0; )
            n = n.replace("--", "-");
        return n
    }(this)
}
//数组去重
Array.prototype.delrep = function(fun) {
    if(!fun) {
        fun = function(d) {return d;};
    }
    var newArr = [];
    this.sort(function(a, b) {
        return fun(a) > fun(b) ? -1 : 1;
    });
    newArr.push(this[0]);
    this.forEach(function(d) {
        if(fun(d) != fun(newArr[0])) {
            newArr.unshift(d);
        }
    });
    return newArr;
};