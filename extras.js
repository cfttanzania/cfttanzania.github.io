// CFT extras: Wildlife Learning Corner (cards, safety tips, quiz) and the website chat helper.
// Everything here works offline once the app has been opened with internet.
(function () {
  // `lang` is declared with let in the page's main script, so it is shared by name (not on window).
  const L = () => ((typeof lang !== 'undefined' && lang === 'sw') ? 'sw' : 'en');
  const t = (en, sw) => (L() === 'sw' ? sw : en);
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------------- LEARNING CORNER DATA ----------------
  const ANIMALS = [
    { e: '🐘', en: 'African elephant', sw: 'Tembo', sci: 'Loxodonta africana',
      fen: 'The largest land animal. It eats grass, leaves, bark and fruit, and needs a lot of water every day. Elephants live in family groups led by an older female.',
      fsw: 'Mnyama mkubwa kuliko wote wa nchi kavu. Hula nyasi, majani, magome na matunda, na huhitaji maji mengi kila siku. Tembo huishi katika makundi ya kifamilia yanayoongozwa na jike mzee.' },
    { e: '🦒', en: 'Giraffe', sw: 'Twiga', sci: 'Giraffa camelopardalis',
      fen: "Tanzania's national animal and the tallest animal in the world. It uses its long tongue to eat leaves from thorny acacia trees.",
      fsw: 'Mnyama wa taifa wa Tanzania na mrefu kuliko wote duniani. Hutumia ulimi wake mrefu kula majani ya miti ya migunga yenye miiba.' },
    { e: '🦁', en: 'Lion', sw: 'Simba', sci: 'Panthera leo',
      fen: 'Lions live in groups called prides and mostly hunt at dusk and at night. Strong bomas protect livestock from lions after dark.',
      fsw: 'Simba huishi katika makundi na huwinda zaidi jioni na usiku. Mazizi imara (boma) hulinda mifugo dhidi ya simba nyakati za usiku.' },
    { e: '🐃', en: 'African buffalo', sw: 'Nyati', sci: 'Syncerus caffer',
      fen: 'Buffalo graze in large herds near water. Old males that live alone can be very dangerous, so always keep your distance.',
      fsw: 'Nyati hula nyasi katika makundi makubwa karibu na maji. Madume wazee wanaoishi peke yao wanaweza kuwa hatari sana, hivyo kaa mbali nao kila wakati.' },
    { e: '🦛', en: 'Hippopotamus', sw: 'Kiboko', sci: 'Hippopotamus amphibius',
      fen: 'Hippos stay in water during the day and come out at night to eat grass. They are one of the most dangerous animals in Africa. Never stand between a hippo and the water.',
      fsw: 'Viboko hukaa majini mchana na hutoka usiku kula nyasi. Ni miongoni mwa wanyama hatari zaidi Afrika. Usisimame kamwe kati ya kiboko na maji.' },
    { e: '🐊', en: 'Nile crocodile', sw: 'Mamba', sci: 'Crocodylus niloticus',
      fen: 'Crocodiles hide in rivers and lakes and attack from the water’s edge. Fetch water in groups, away from the edge, and never at night.',
      fsw: 'Mamba hujificha mitoni na maziwani na hushambulia kutoka ukingoni mwa maji. Chota maji kwa vikundi, mbali na ukingo, na kamwe usiku.' },
    { e: '🦓', en: 'Plains zebra', sw: 'Punda milia', sci: 'Equus quagga',
      fen: 'Zebras eat grass and often move together with wildebeest. The stripe pattern of every zebra is different, like a fingerprint.',
      fsw: 'Punda milia hula nyasi na mara nyingi huhama pamoja na nyumbu. Mistari ya kila punda milia ni tofauti, kama alama za vidole.' },
    { e: '🐂', en: 'Wildebeest', sw: 'Nyumbu', sci: 'Connochaetes taurinus',
      fen: 'Famous for the great migration in the Serengeti ecosystem, where very large herds follow the rains to find fresh grass.',
      fsw: 'Wanajulikana kwa uhamaji mkubwa katika ikolojia ya Serengeti, ambapo makundi makubwa sana hufuata mvua kutafuta nyasi mpya.' },
    { e: '🐆', en: 'Leopard', sw: 'Chui', sci: 'Panthera pardus',
      fen: 'Leopards live alone, are strong climbers and often carry their prey up into trees. They are shy and mostly active at night.',
      fsw: 'Chui huishi peke yao, ni hodari wa kupanda miti na mara nyingi hupandisha mawindo yao mitini. Ni waoga na hufanya shughuli zaidi usiku.' },
    { e: '🐾', en: 'Spotted hyena', sw: 'Fisi', sci: 'Crocuta crocuta',
      fen: 'Hyenas both hunt and scavenge, and help keep the land clean. They are active at night and may take livestock that is not kept in a boma.',
      fsw: 'Fisi huwinda na pia hula mizoga, na husaidia kuweka mazingira safi. Hufanya shughuli usiku na wanaweza kukamata mifugo isiyowekwa zizini.' },
    { e: '🐒', en: 'Baboon', sw: 'Nyani', sci: 'Papio spp.',
      fen: 'Baboons live in troops and are clever. They often raid crops and food stores, so never leave food where they can reach it.',
      fsw: 'Nyani huishi kwa makundi na ni werevu. Mara nyingi huvamia mazao na hifadhi za chakula, hivyo usiache chakula mahali wanapoweza kukifikia.' },
  ];
  const TREES = [
    { e: '🌳', en: 'Baobab', sw: 'Mbuyu', sci: 'Adansonia digitata',
      fen: 'Baobabs can live for many hundreds of years and store water in their thick trunks. The fruit, ubuyu, is rich in vitamin C.',
      fsw: 'Mibuyu inaweza kuishi kwa mamia mengi ya miaka na huhifadhi maji kwenye shina lake nene. Tunda lake, ubuyu, lina vitamini C kwa wingi.' },
    { e: '🪵', en: 'African blackwood', sw: 'Mpingo', sci: 'Dalbergia melanoxylon',
      fen: "Tanzania's national tree. Its very hard, dark wood is used for carvings and musical instruments. It grows slowly and needs protection from overharvesting.",
      fsw: 'Mti wa taifa wa Tanzania. Mbao zake ngumu sana na nyeusi hutumika kuchonga vinyago na kutengeneza ala za muziki. Hukua polepole na unahitaji kulindwa dhidi ya uvunaji kupita kiasi.' },
    { e: '🌿', en: 'Umbrella thorn acacia', sw: 'Mgunga', sci: 'Vachellia tortilis',
      fen: 'A flat-topped tree of the dry savanna. Its leaves and pods feed giraffes and goats, and it adds nitrogen to the soil.',
      fsw: 'Mti wenye kilele bapa wa savana kavu. Majani na maganda yake ni chakula cha twiga na mbuzi, na huongeza naitrojeni kwenye udongo.' },
    { e: '🌲', en: 'Mninga (Bloodwood)', sw: 'Mninga', sci: 'Pterocarpus angolensis',
      fen: 'A valuable timber tree of the miombo woodlands. It grows slowly, so cutting must be controlled and new trees planted.',
      fsw: 'Mti wa mbao wenye thamani wa misitu ya miombo. Hukua polepole, hivyo ukataji lazima udhibitiwe na miti mipya ipandwe.' },
    { e: '🍃', en: 'Neem', sw: 'Mwarobaini', sci: 'Azadirachta indica',
      fen: 'A fast-growing shade tree brought to East Africa long ago. Its leaves are used as a natural insect repellent, and it is a popular traditional remedy.',
      fsw: 'Mti wa kivuli unaokua haraka ulioletwa Afrika Mashariki zamani. Majani yake hutumika kufukuza wadudu kwa njia ya asili, na ni dawa maarufu ya jadi.' },
    { e: '🥭', en: 'Mango tree', sw: 'Mwembe', sci: 'Mangifera indica',
      fen: 'A fruit and shade tree grown across Tanzania. It gives food and income, and a good place to meet in its shade.',
      fsw: 'Mti wa matunda na kivuli unaopandwa kote Tanzania. Hutoa chakula na kipato, na kivuli chake ni mahali pazuri pa kukutania.' },
  ];
  const TIPS = [
    { e: '📏', en: 'Keep your distance from wild animals, even if they look calm. Never go close for a photo.', sw: 'Kaa mbali na wanyamapori hata kama wanaonekana watulivu. Usiwasogelee kamwe ili kupiga picha.' },
    { e: '🦁', en: 'If you meet a lion or leopard, do not run. Stand tall, stay calm and back away slowly.', sw: 'Ukikutana na simba au chui, usikimbie. Simama wima, tulia na urudi nyuma taratibu.' },
    { e: '🐄', en: 'Keep livestock in a strong boma at night, with good fencing and lights if possible.', sw: 'Weka mifugo kwenye boma imara usiku, lenye uzio mzuri na taa ikiwezekana.' },
    { e: '🌶️', en: 'Chili fences and beehive fences can help keep elephants away from farms.', sw: 'Uzio wa pilipili na uzio wa mizinga ya nyuki unaweza kusaidia kuzuia tembo wasiingie mashambani.' },
    { e: '💧', en: 'Fetch water in groups, away from the river edge and never at night, because of crocodiles and hippos.', sw: 'Chota maji kwa vikundi, mbali na ukingo wa mto na kamwe usiku, kwa sababu ya mamba na viboko.' },
    { e: '🍌', en: 'Never feed wild animals or leave food outside. It teaches them to come back.', sw: 'Usiwalishe wanyamapori wala kuacha chakula nje. Huwafundisha kurudi tena.' },
    { e: '🔦', en: 'Avoid walking alone in the bush at night. Carry a torch and walk in groups.', sw: 'Epuka kutembea peke yako porini usiku. Beba tochi na tembea kwa vikundi.' },
    { e: '📞', en: 'Report problem animals to your village leaders or the district game officer. Do not try to deal with them yourself.', sw: 'Ripoti wanyama wanaoleta matatizo kwa viongozi wa kijiji au afisa wanyamapori wa wilaya. Usijaribu kuwashughulikia mwenyewe.' },
  ];
  const QUIZ = [
    { q: ["Which is Tanzania's national animal?", 'Mnyama wa taifa wa Tanzania ni yupi?'], o: [['Giraffe', 'Twiga'], ['Lion', 'Simba'], ['Elephant', 'Tembo'], ['Zebra', 'Punda milia']], a: 0 },
    { q: ["Which is Tanzania's national tree?", 'Mti wa taifa wa Tanzania ni upi?'], o: [['Baobab', 'Mbuyu'], ['African blackwood (Mpingo)', 'Mpingo'], ['Mango', 'Mwembe'], ['Neem', 'Mwarobaini']], a: 1 },
    { q: ['Where do hippos spend most of the day?', 'Viboko hukaa wapi mchana mwingi?'], o: [['In trees', 'Mitini'], ['In caves', 'Mapangoni'], ['In water', 'Majini'], ['In the desert', 'Jangwani']], a: 2 },
    { q: ['What should you do if you meet a lion?', 'Ufanye nini ukikutana na simba?'], o: [['Run away fast', 'Kukimbia haraka'], ['Go closer for a photo', 'Kusogea karibu kupiga picha'], ['Stay calm, do not run, back away slowly', 'Tulia, usikimbie, rudi nyuma taratibu'], ['Lie down on the ground', 'Kulala chini']], a: 2 },
    { q: ['What can help keep elephants away from farms?', 'Nini kinaweza kusaidia kuzuia tembo mashambani?'], o: [['Leaving food at the farm edge', 'Kuacha chakula pembeni ya shamba'], ['Chili or beehive fences', 'Uzio wa pilipili au wa mizinga ya nyuki'], ['Planting more maize', 'Kupanda mahindi zaidi'], ['Throwing stones at them', 'Kuwarushia mawe']], a: 1 },
    { q: ['Why should we fetch water in groups and away from the river edge?', 'Kwa nini tuchote maji kwa vikundi na mbali na ukingo wa mto?'], o: [['Because of crocodiles', 'Kwa sababu ya mamba'], ['Because the water is cold', 'Kwa sababu maji ni baridi'], ['To walk faster', 'Ili kutembea haraka'], ['There is no reason', 'Hakuna sababu']], a: 0 },
    { q: ['What is the baobab fruit called in Kiswahili?', 'Tunda la mbuyu huitwaje kwa Kiswahili?'], o: [['Ukwaju', 'Ukwaju'], ['Ubuyu', 'Ubuyu'], ['Embe', 'Embe'], ['Nazi', 'Nazi']], a: 1 },
    { q: ['Where should we keep livestock at night?', 'Mifugo iwekwe wapi usiku?'], o: [['Grazing in the bush', 'Malishoni porini'], ['Tied to a tree', 'Imefungwa mtini'], ['In a strong boma', 'Kwenye boma imara'], ['Near the river', 'Karibu na mto']], a: 2 },
    { q: ['Which animal is famous for the great migration in the Serengeti?', 'Mnyama gani anajulikana kwa uhamaji mkubwa Serengeti?'], o: [['Wildebeest', 'Nyumbu'], ['Leopard', 'Chui'], ['Hippo', 'Kiboko'], ['Baboon', 'Nyani']], a: 0 },
    { q: ['Who should you report a problem animal to?', 'Mnyama anayeleta matatizo aripotiwe kwa nani?'], o: [['Nobody', 'Hakuna'], ['Village leaders or the district game officer', 'Viongozi wa kijiji au afisa wanyamapori wa wilaya'], ['Deal with it yourself', 'Ushughulikie mwenyewe'], ['Only post it on social media', 'Uweke mitandaoni tu']], a: 1 },
  ];

  // ---------------- LEARNING CORNER UI ----------------
  let lTab = 'animals', qi = 0, score = 0, answered = false;
  const card = x => `<div class="lcard"><div class="lic">${x.e}</div><div><h4>${esc(L() === 'sw' ? x.sw : x.en)} <span>${esc(L() === 'sw' ? x.en : x.sw)}</span></h4><i>${esc(x.sci)}</i><p>${esc(L() === 'sw' ? x.fsw : x.fen)}</p></div></div>`;
  function renderLearn() {
    const box = $('learnBox'); if (!box) return;
    document.querySelectorAll('#learnTabs button').forEach(b => b.classList.toggle('on', b.dataset.lt === lTab));
    if (lTab === 'animals') box.innerHTML = `<div class="lgrid">${ANIMALS.map(card).join('')}</div>`;
    else if (lTab === 'trees') box.innerHTML = `<div class="lgrid">${TREES.map(card).join('')}</div>`;
    else if (lTab === 'safety') box.innerHTML = `<ol class="tips">${TIPS.map(x => `<li><span>${x.e}</span><p>${esc(L() === 'sw' ? x.sw : x.en)}</p></li>`).join('')}</ol>`;
    else renderQuiz();
  }
  function renderQuiz() {
    const box = $('learnBox');
    if (qi >= QUIZ.length) {
      const pct = Math.round(score / QUIZ.length * 100);
      const msg = pct >= 80 ? t('Excellent! You are a wildlife champion. 🏆', 'Hongera sana! Wewe ni bingwa wa wanyamapori. 🏆')
        : pct >= 50 ? t('Well done! Read the cards and try again to get a higher score.', 'Umefanya vizuri! Soma kadi kisha jaribu tena upate alama zaidi.')
        : t('Keep learning! Read the cards and safety tips, then try again.', 'Endelea kujifunza! Soma kadi na tahadhari, kisha jaribu tena.');
      box.innerHTML = `<div class="quiz done"><div class="big">${score} / ${QUIZ.length}</div><p>${msg}</p><button class="btn" onclick="cftQuiz(-1)">${t('Try again', 'Jaribu tena')}</button></div>`;
      return;
    }
    const q = QUIZ[qi], k = L() === 'sw' ? 1 : 0;
    box.innerHTML = `<div class="quiz"><div class="qbar"><span style="width:${qi / QUIZ.length * 100}%"></span></div>
      <div class="qn">${t('Question', 'Swali')} ${qi + 1} ${t('of', 'kati ya')} ${QUIZ.length} · ${t('Score', 'Alama')}: ${score}</div>
      <h4>${esc(q.q[k])}</h4><div class="opts">${q.o.map((o, i) => `<button onclick="cftQuiz(${i})">${esc(o[k])}</button>`).join('')}</div>
      <p class="qfb" id="qfb"></p><button class="btn hidden" id="qnext" onclick="cftQuiz(-2)">${qi + 1 < QUIZ.length ? t('Next question →', 'Swali linalofuata →') : t('See my score', 'Ona alama zangu')}</button></div>`;
    answered = false;
  }
  window.cftQuiz = i => {
    if (i === -1) { qi = 0; score = 0; renderQuiz(); return; }
    if (i === -2) { qi++; renderQuiz(); return; }
    if (answered) return; answered = true;
    const q = QUIZ[qi], k = L() === 'sw' ? 1 : 0, btns = document.querySelectorAll('#learnBox .opts button');
    btns.forEach((b, j) => { b.disabled = true; if (j === q.a) b.classList.add('right'); else if (j === i) b.classList.add('wrong'); });
    if (i === q.a) { score++; $('qfb').textContent = t('✓ Correct!', '✓ Sahihi!'); $('qfb').className = 'qfb ok'; }
    else { $('qfb').textContent = t('✗ The correct answer is: ', '✗ Jibu sahihi ni: ') + q.o[q.a][k]; $('qfb').className = 'qfb no'; }
    $('qnext').classList.remove('hidden');
  };
  window.cftLearnTab = b => { lTab = b.dataset.lt; renderLearn(); };

  // ---------------- CHAT HELPER ----------------
  const WA = () => { const n = (window.CFT_WHATSAPP || '').replace(/\D/g, ''); return n ? 'https://wa.me/' + n + '?text=' + encodeURIComponent('Habari CFT, ') : ''; };
  const go = (id, label) => `<a href="#${id}" onclick="cftChat(false)">${label}</a>`;
  const TOPICS = {
    about: () => t(`CFT (Charity Foundation CFT Tanzania) is a registered NGO (00NGO/R/10502) working across Tanzania on wildlife conservation, climate-smart farming, community empowerment, education and child protection. ${go('programmes', 'See our programmes →')}`,
      `CFT (Charity Foundation CFT Tanzania) ni shirika lisilo la kiserikali lililosajiliwa (00NGO/R/10502) linalofanya kazi kote Tanzania katika uhifadhi wa wanyamapori, kilimo kinachohimili tabianchi, uwezeshaji wa jamii, elimu na ulinzi wa mtoto. ${go('programmes', 'Ona programu zetu →')}`),
    volunteer: () => t(`We would love your help! Fill in the short volunteer form and our team will contact you. <button class="chip" onclick="cftChat(false);openForm('volunteer')">🙋 Open volunteer form</button>`,
      `Tungefurahi kupata msaada wako! Jaza fomu fupi ya kujitolea na timu yetu itawasiliana nawe. <button class="chip" onclick="cftChat(false);openForm('volunteer')">🙋 Fungua fomu ya kujitolea</button>`),
    partner: () => t(`Organisations, schools and government bodies are welcome to work with us. Tell us about your organisation in the partner form. <button class="chip" onclick="cftChat(false);openForm('partner')">🤝 Open partner form</button>`,
      `Mashirika, shule na taasisi za serikali zinakaribishwa kushirikiana nasi. Tueleze kuhusu taasisi yako kwenye fomu ya washirika. <button class="chip" onclick="cftChat(false);openForm('partner')">🤝 Fungua fomu ya washirika</button>`),
    donate: () => t('Thank you for thinking of supporting CFT! Our official donation channels will be published on this website once they are verified. Until then, please contact us directly.',
      'Asante kwa kufikiria kuisaidia CFT! Njia rasmi za kuchangia zitawekwa kwenye tovuti hii baada ya kuthibitishwa. Kwa sasa, tafadhali wasiliana nasi moja kwa moja.'),
    contact: () => t(`Head office: West Buhongwa Street, Buhongwa, Nyamagana, Mwanza.<br>Email: charityfoundationtanzaniacft@gmail.com<br>${go('contact', 'Send us a message →')}`,
      `Ofisi kuu: Mtaa wa West Buhongwa, Buhongwa, Nyamagana, Mwanza.<br>Barua pepe: charityfoundationtanzaniacft@gmail.com<br>${go('contact', 'Tutumie ujumbe →')}`),
    learn: () => t(`Our Wildlife Learning Corner has animal and tree cards, safety tips and a quiz, in English and Kiswahili. It also works offline in the app. ${go('learn', 'Open the Learning Corner →')}`,
      `Kona yetu ya Kujifunza kuhusu Wanyamapori ina kadi za wanyama na miti, tahadhari za usalama na chemsha bongo, kwa Kiingereza na Kiswahili. Inafanya kazi hata bila mtandao kwenye programu. ${go('learn', 'Fungua Kona ya Kujifunza →')}`),
    conflict: () => t(`If a wild animal is causing danger or destroying crops, keep people away and report it to your village leaders or the district game officer. Do not try to deal with it yourself. ${go('learn', 'Read our safety tips →')}`,
      `Kama mnyamapori anahatarisha watu au kuharibu mazao, waweke watu mbali na ripoti kwa viongozi wa kijiji au afisa wanyamapori wa wilaya. Usijaribu kumshughulikia mwenyewe. ${go('learn', 'Soma tahadhari zetu →')}`),
    members: () => t('CFT members can sign in with the 👤 Members login button to record and view contributions. If you forgot your password, use "Forgot password?" on the login screen.',
      'Wanachama wa CFT wanaweza kuingia kupitia kitufe cha 👤 Wanachama: Ingia ili kurekodi na kuona michango. Ukisahau nenosiri, tumia "Umesahau nenosiri?" kwenye ukurasa wa kuingia.'),
    app: () => t('You can install CFT as an app on Android: open this website in Chrome and tap "Install app", or use the ⋮ menu → "Add to Home screen". It works even with weak internet.',
      'Unaweza kusakinisha CFT kama programu kwenye Android: fungua tovuti hii kwa Chrome kisha bonyeza "Pakua programu", au tumia menyu ⋮ → "Add to Home screen". Inafanya kazi hata mtandao ukiwa dhaifu.'),
    human: (plain) => WA() ? t(`${plain ? '' : 'Sure! '}Chat with our team on WhatsApp: <a class="chip" href="${WA()}" target="_blank" rel="noopener">💬 Open WhatsApp</a>`, `${plain ? '' : 'Sawa! '}Ongea na timu yetu kupitia WhatsApp: <a class="chip" href="${WA()}" target="_blank" rel="noopener">💬 Fungua WhatsApp</a>`)
      : t(`Please send us a message and our team will reply. ${go('contact', 'Contact form →')}`, `Tafadhali tutumie ujumbe na timu yetu itajibu. ${go('contact', 'Fomu ya mawasiliano →')}`),
  };
  const KEYS = [
    ['volunteer', /volunt|jitole|help out|join/i],
    ['partner', /partner|ushirik|mshirik|collaborat|organi[sz]ation|taasisi|school|shule/i],
    ['donate', /donat|chang|give money|support|fund|pesa|m-?pesa/i],
    ['conflict', /conflict|attack|crop|raid|elephant.*farm|problem animal|migogoro|wakorofi|wameharibu|danger|hatari/i],
    ['learn', /learn|quiz|animal|tree|wanyama|miti|jifunz|chemsha|student|mwanafunzi|teacher|mwalimu/i],
    ['members', /member|login|log in|password|nenosiri|ingia|mchango|contribut/i],
    ['app', /app|install|programu|pakua|download/i],
    ['contact', /contact|where|location|address|office|email|phone|simu|wapi|ofisi|mawasiliano|anwani/i],
    ['human', /human|person|someone|talk|whatsapp|mtu|ongea|zungumza/i],
    ['about', /what|who|about|cft|do you do|kazi|nini|ninyi|ni nani|programme|program/i],
  ];
  const QUICK = () => [['about', t('What does CFT do?', 'CFT inafanya nini?')], ['volunteer', t('Volunteer', 'Kujitolea')], ['partner', t('Partner with us', 'Ushirikiano')],
    ['donate', t('Donate', 'Kuchangia')], ['learn', t('Learning Corner', 'Kona ya Kujifunza')], ['conflict', t('Wildlife problem', 'Tatizo la wanyamapori')], ['contact', t('Contact & location', 'Mawasiliano')], ['human', t('Talk to a person', 'Ongea na mtu')]];
  let started = false;
  function add(html, who) { const log = $('chatLog'), d = document.createElement('div'); d.className = 'cm ' + who; d.innerHTML = html; log.appendChild(d); log.scrollTop = log.scrollHeight; }
  function quick() { $('chatQuick').innerHTML = QUICK().map(q => `<button class="chip" onclick="cftAsk('${q[0]}')">${esc(q[1])}</button>`).join(''); }
  function start() {
    $('chatLog').innerHTML = '';
    add(t("Hello! 👋 I'm CFT's automatic helper. Choose a topic below or type your question.", 'Habari! 👋 Mimi ni msaidizi wa kiotomatiki wa CFT. Chagua mada hapa chini au andika swali lako.'), 'bot');
    quick(); started = true;
  }
  window.cftChat = open => {
    const p = $('chatPanel'); const on = open === undefined ? !p.classList.contains('on') : open;
    p.classList.toggle('on', on); if (on && !started) start(); if (on) setTimeout(() => $('chatIn').focus(), 50);
  };
  window.cftAsk = key => { const q = QUICK().find(x => x[0] === key); if (q) add(esc(q[1]), 'me'); setTimeout(() => add(TOPICS[key](), 'bot'), 250); };
  window.cftSend = e => {
    e.preventDefault(); const v = $('chatIn').value.trim(); if (!v) return; $('chatIn').value = ''; add(esc(v), 'me');
    if (/^(hi|hello|hey|habari|mambo|salama|jambo|shikamoo|hujambo)\b/i.test(v)) { setTimeout(() => add(t('Hello! How can I help you today?', 'Salama! Nikusaidie nini leo?'), 'bot'), 250); return; }
    if (/thank|asante/i.test(v)) { setTimeout(() => add(t('You are welcome! 😊', 'Karibu sana! 😊'), 'bot'), 250); return; }
    const hit = KEYS.find(k => k[1].test(v));
    setTimeout(() => add(hit ? TOPICS[hit[0]]() : t("Sorry, I don't have an answer for that yet. Our team can help you directly:", 'Samahani, bado sina jibu la hilo. Timu yetu inaweza kukusaidia moja kwa moja:') + '<br>' + TOPICS.human(true), 'bot'), 300);
  };

  // ---------------- OPERATIONS MAP ----------------
  const TYPES = {
    office: { e: '🏢', en: 'Office', sw: 'Ofisi' },
    project: { e: '🌱', en: 'Project site', sw: 'Eneo la mradi' },
    school: { e: '🏫', en: 'School', sw: 'Shule' },
    community: { e: '🏘️', en: 'Community / village', sw: 'Jamii / kijiji' },
    partner: { e: '🤝', en: 'Partner', sw: 'Mshirika' },
  };
  const HQ = { id: 'hq', name: 'CFT Head Office', type: 'office', region: 'Mwanza', lat: -2.6, lng: 32.89,
    desc: 'West Buhongwa Street, Buhongwa Ward, Nyamagana District, Mwanza (approximate location).',
    descSw: 'Mtaa wa West Buhongwa, Kata ya Buhongwa, Wilaya ya Nyamagana, Mwanza (mahali pa takriban).' };
  let places = [HQ], map = null, layer = null, markers = {}, picking = false;
  const pDesc = p => (L() === 'sw' && p.descSw) ? p.descSw : (p.desc || '');
  const tName = k => (TYPES[k] || TYPES.project)[L()];

  function renderPlaces() {
    const list = $('pList2'); if (!list) return;
    const regions = new Set(places.map(p => p.region).filter(Boolean));
    $('msPlaces').textContent = places.length; $('msRegions').textContent = regions.size;
    $('msProj').textContent = places.filter(p => p.type === 'project').length;
    $('mLegend').innerHTML = Object.keys(TYPES).map(k => `<span>${TYPES[k].e} ${esc(tName(k))}</span>`).join('');
    list.innerHTML = places.map(p => `<button class="pitem" onclick="cftFly('${p.id}')"><span class="pe">${(TYPES[p.type] || TYPES.project).e}</span><span><b>${esc(p.name)}</b><small>${esc(tName(p.type))} · ${esc(p.region || '')}</small></span></button>`).join('');
    if (!map) return;
    layer.clearLayers(); markers = {};
    places.forEach(p => {
      const icon = window.L.divIcon({ className: '', html: `<div class="pin">${(TYPES[p.type] || TYPES.project).e}</div>`, iconSize: [30, 30], iconAnchor: [15, 28], popupAnchor: [0, -24] });
      markers[p.id] = window.L.marker([p.lat, p.lng], { icon }).addTo(layer)
        .bindPopup(`<b>${esc(p.name)}</b><br><small>${esc(tName(p.type))} · ${esc(p.region || '')}</small>${pDesc(p) ? `<p style="margin:6px 0 0">${esc(pDesc(p))}</p>` : ''}`);
    });
  }
  window.cftSetPlaces = list => { places = [HQ, ...list.filter(p => typeof p.lat === 'number' && typeof p.lng === 'number')]; renderPlaces(); };
  window.cftFly = id => {
    const p = places.find(x => x.id === id); if (!p || !map) return;
    map.flyTo([p.lat, p.lng], 9, { duration: .8 }); setTimeout(() => markers[id] && markers[id].openPopup(), 850);
  };
  function loadMap() {
    if (map || !$('cftMap')) return;
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(css);
    const js = document.createElement('script'); js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.onload = () => {
      const el = $('cftMap'); el.innerHTML = '';
      map = window.L.map(el, { scrollWheelZoom: false, minZoom: 5, maxBounds: [[-15, 26], [3, 44]] }).setView([-6.3, 34.9], 6);
      window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
      layer = window.L.layerGroup().addTo(map);
      map.on('click', e => {
        if (!picking) return; picking = false; $('pickBar').classList.remove('on');
        $('plLat').value = e.latlng.lat.toFixed(5); $('plLng').value = e.latlng.lng.toFixed(5);
        openMembers(); const b = document.querySelector('#tabs button[data-tab="pMap"]'); if (b) tab(b);
      });
      renderPlaces();
    };
    js.onerror = () => { $('cftMap').innerHTML = `<div class="mapfall">${t('The map needs an internet connection. The list of places is shown here.', 'Ramani inahitaji mtandao. Orodha ya maeneo inaonyeshwa hapa.')}</div>`; };
    document.head.appendChild(js);
  }
  window.cftPick = () => {
    if (!map) { $('plMsg').textContent = t('The map is not loaded yet (it needs internet).', 'Ramani bado haijapakia (inahitaji mtandao).'); loadMap(); return; }
    closeMembers(); picking = true; $('pickBar').classList.add('on');
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
  };
  if ('IntersectionObserver' in window && $('map')) {
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); loadMap(); } }, { rootMargin: '400px' });
    io.observe($('map'));
  } else loadMap();

  // ---------------- language + start ----------------
  const _set = window.setLang;
  window.setLang = l => { _set(l); renderLearn(); renderPlaces(); if (started) quick(); };
  renderLearn(); renderPlaces();
})();
