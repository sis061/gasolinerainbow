import { diskImages } from "@/assets/images/images";
import type { Disk } from "@/types/discography";

// TODO: 앨범커버, 링크 다 되면 데이터 업데이트

const diskAlbumData: Disk[] = [
  {
    targetCarousel: { carouselIndex: 0, slideIndex: 1 },
    type: "album",
    year: 2025,
    titleKr: "평화로운 뇌와…",
    titleEn: "A Brain In Peace &…",
    image: diskImages.hm,
    urls: {
      bandcamp: "",
      spotify: "",
      youtubeMusic: "",
      appleMusic: "",
      melon: "",
      bugs: "",
      genie: "",
    },
    isCD: false,
    maansunUrl: "https://maansun.com/",
    descriptionKr: `지하철, 침대, 라디오,
치사랑, 성애, 섭식장애,

09시, 18시, 22시, 03시,
원숭이, 고양이, 정어리,

모두의 무기력,
모두의 무가치함,
모두의 모두에 대한 이별,

그럼에도 우리는.`,
    descriptionEn: `The subway, the bed, the radio.
Filial love, desire, disordered eating.

9 a.m., 6 p.m., 10 p.m., 3 a.m.
Monkey, cat, sardine.

Everyone’s lethargy.
Everyone’s worthlessness.
Everyone’s farewell to everyone.

And still—we are.`,
    credits: `
Produced by HIMINN
Composed by HIMINN
Lyrics by HIMINN
Arranged by HIMINN

Vocal by HIMINN
All instruments performed and programmed by HIMINN
  except orchestrations by 손다협 (see below)

Orchestrations
- Track 8: Arranged and MIDI programmed by 손다협; re-edited by HIMINN
- Track 9: Written by HIMINN; MIDI programmed by 손다협

Recorded at Phoné Studio  (Track 2-6, 8-9)
Mixed & Mastered by Shinhwan at Phoné Studio
Artwork by namu 나무`,
    tracks: [
      {
        trackNo: 1,
        titleKr: "가솔린 무지개",
        titleEn: "Gasoline Rainbow",
        lyrics: `어느 새벽, 작은 악마 하나가 찾아와 속삭였습니다.

'너에게 내 모든 권능을 주고, 그 영광은 네가 가질 수 있게 해주겠다.

대신 나머지 모든 것들은 언제든 잃어버리게 될 것이다.'

당신은 별 대수롭지 않게 여기며 그의 제안을 승낙합니다.


놀랍게도 몇 년을 고민하던 이야기를 쉬이 풀어내게 되었습니다. 당신은 기뻐 금치 못합니다.

하지만 당신은 곧 알게 됩니다. 악마가 취해 간 것들을.


길을 걷다 마주친 고양이들은 두 번 다시 눈길을 주지 않습니다.

해가 졌음에도 당신은 달콤한 잠에 들지 못합니다.

한때 같이 걷고, 같이 잠들었지만 이제는 당신을 피해 달아나는 무수한 사람들을 보게 됩니다.


악마는 참 잔인하게도 기억은 잃지 못하게 하는 장치를 심어 두었습니다.

그 모든 이별에도 당신은 살아가고, 살아버립니다.


참 불쌍하네요, 우린.`,
        tags: [],
      },
      {
        trackNo: 2,
        titleKr: "Corns N Beans",
        titleEn: "Corns N Beans",
        lyrics: `
나는 너에게 영광을 주겠다

대신 너에게서 밤에 자는 잠을 뺏겠다

나는 너에게 모든 걸 주겠다

대신 너는 그 모든 이별을 준비하    라


이름없는 고양이의 겨울에

달아나는 당신의 뒷모습에

부서지고 깨지고 무너지게

그럼에도 우리는...


(그 모든 이별에)

살아야 하는 게

살아만 가는 게

살아는 지는 게


나는 괜히 잠을 잤네

나는 괜히 밤을 걷네

나는 괜히 멀리 갔네

나는 괜히 너랑


꺼져가는 불씨가 아쉬울 때

마지막엔 차마 눈감음에

부서지고 베이고 스러지게

그럼에도 우리는...


(그 모든 이별에)

살아야 하는 게

살아만 가는 게

살아는 지는 게


(그 모든 이별에)`,
        tags: [],
      },
      {
        trackNo: 3,
        titleKr: "9호선",
        titleEn: "Line 9",
        lyrics: `Fish in suits

We’re all fish in suits

In the tin box train

Roaming this city in gray


Packt in rows

Stray, stray, stray

Yet we roam around around around around around around...

We gaze

But words never come

Words never come


There’s a shimmer, shine

At the end of this track

But we never know, (They’ll never know)

Only go backwards

Underground



Awake, Commute, Work, Eat, Work, Commute, Sleep, Repeat,

Awake, Commute, Work, Consume, Work, Commute, Produce, Repeat,

Repeat, Work, Commute, Consume, Work, Commute, Produce, Wrap it up!

Bodies Packed, Chopped, Sealed, Wrapped, Boxed, and then we’re on


Escalators, Escalators, Escalators, Escalators,

TURN

Escalators, Escalators, Escalators, Escalators,

Escalators, Escalators, Escalators, Escalators,

PUSH

Escalators, Escalators, Escalators, Escalators,

Escalators, Escalators, Escalators, Escalators,

BURN

Escalators, Escalators, Escalators, Escalators,


Honey, Your dish is ready

and BOOM!



In plastic dreams

Floating in ocean tides

So bright and warm

Scattered light, Underwater

We could go anywhere

We could do everything


Nobody tells

Now what should we do?

Too bright to see

Sink into the sweet, sweetest terror

We can’t take it anymore

Just wake me at the next station



Chained, Still, Still, Still

Drained, Still, Still, Still

We're Still, Still, Still


Chained, Still, Still, Still

Prained, Still, Still, Still`,
        tags: [],
      },
      {
        trackNo: 4,
        titleKr: "열한번째 고양이의 밤",
        titleEn: "Ninth Life, Eleventh Night",
        lyrics: `우린 다시 만나자, 열한 번째 고양이의 밤에서

비를 맞을 일도 없이, 따뜻한, 따뜻한


우린 뒤를 보진 말자

담요 속에 얼굴을 파묻고 그냥 숨자

전화가 울려도 끝없이 위로, 위로만 가자

누가 소리를 질러도 끝없이 안으로, 안으로


있잖아, 기다리진 말아, 나를

있잖아, 기다리진 말아, 나를

있잖아, 기다리진 말아, 나를

있잖아, 기다리지 말아, 나를

있잖아, 기다리지...

뜨문 뜨문 뜨문`,
        tags: [],
      },
      {
        trackNo: 5,
        titleKr: "The Monkey/Mother-ship",
        titleEn: "The Monkey/Mother-ship",
        lyrics: `Have I been thrown away?

In a six-sided mirrored room

Stand in an aisle

2 mothers in my view


My twin, you’ve grown up quite a lot

Then haven’t I?

Stand in an aisle

2 mothers in my view


Floating inside the mothership

Cold, artificial mother’s milk

Warm you is the other thing

Can’t tell fake from real


Floating inside the mothership

Cold, artificial love

Warm you is the other thing

Compassion exceeds comfort


Oh, I was thrown away

but you are here now

Stand in an aisle

We few happy family`,
        tags: [],
      },
      {
        trackNo: 6,
        titleKr: "Dinner, the Pill & the Feast",
        titleEn: "Dinner, the Pill & the Feast",
        lyrics: `Devouring

Anodyne

I woke up

An emptiness

Rue

Swell

Exploded

in silence


Beef beef beef

I want more beef


I throw up

Rail against

Charge

Ah, keep it

Chagrin

Epicure

Promiscuous


Light

Red light

Light

For you pigs


Words for words

Divulge

Food food food


Ah, Shut up and just chew it`,
        tags: [],
      },
      {
        trackNo: 7,
        titleKr: "Nudity",
        titleEn: "Nudity",
        lyrics: `I’ve never loved my luv


The Nudity

Just let me go to sleep

Far too easily

Low comedy


Salivary

I don’t bloom again

Far too easily

No such remedy


I’ve never lived my life


My property

No more of that Lunatic

Far too easily

Far too easily

Far too easily`,
        tags: [],
      },
      {
        trackNo: 8,
        titleKr: "V.",
        titleEn: "V.",
        lyrics: `I have done nothing better

널 이룰거란 기대 버려

I'd have done, if nothing mattered

가치 없는 꿈에 기대어


I have done nothing better

널 이룰거란 기대 버려

I'd have done, if nothing mattered

가치 없는 꿈에 날 깨워`,
        tags: [],
      },
      {
        trackNo: 9,
        titleKr: "2025년 즈음에는 좋은 아이가 되어볼게요",
        titleEn: "Yr 2025 Problem",
        lyrics: `2025년 즈음에는 좋은 아이가 될게요

큰 사람이 되지는 못할게요

지하철에 수많은 신발들이 날 노려봐요

그 안에 더 많은 열 개의 눈이 날 봐요


거꾸로 달리는 기차 안에서

사람들은 소리를 지르고

나는 가만히 잠을 잤어요

자다가 못 내리면 좋을 텐데


같잖은 소음으로 노래하지 않을게요

이것도 음악인지 잘 모르겠다구요

일다운 일을 해보려 할게요

원하던 시험도 언제 한 번 쳐볼게요


거꾸로 달리는 기차 안에서

사람들은 소리를 지르고

나는 가만히 잠을 잤어요

자다가 못 내리면 좋을 텐데


라디오-친화적인 노래 위주로

라디오 그 근처도 못 가겠지만

그래서 티비에는 언제 나오니?

그래서 무대에 서지 말아 볼게요


거꾸로 달리는 기차 안에서

사람들은 소리를 지르고

나는 가만히 잠을 잤어요


거꾸로 달리는 전철 안에서

사람들은 앞으로 내지르고

나는 가만히`,
        tags: ["Title"],
      },
    ],
  },
  {
    targetCarousel: { carouselIndex: 1, slideIndex: 1 },
    type: "album",
    year: 2022,
    titleKr: "HM",
    titleEn: "HM",
    image: diskImages.hm,
    urls: {
      bandcamp: "https://himinnn.bandcamp.com/album/hm",
      spotify: "https://open.spotify.com/album/2kwKctIlNJCNK5mU9a0FEF",
      youtubeMusic:
        "https://music.youtube.com/playlist?list=OLAK5uy_mqSbyG7WqaMdeYnQmj7k1jfoqIOho5FUg&si=D_QEKJKzZXiNFTKh",
      appleMusic: "https://music.apple.com/us/album/hm/1659621243",
      melon: "https://www.melon.com/album/detail.htm?albumId=11121710",
      bugs: "https://music.bugs.co.kr/album/20533309",
      genie: "https://www.genie.co.kr/detail/albumInfo?axnm=83280159",
    },
    isCD: true,
    cdUrl: [
      {
        store: "6v6 Recordings",
        color: "#FCDF32",
        url: "https://smartstore.naver.com/6v6recordings/products/9436037351",
      },
    ],
    descriptionKr: `저에게 제 노래는 일종의 방어입니다. 자신을 바라보고 제 속의 갈등—주로 고독 및 자기 비난—을 다시 곱게 빚어내는 자기 방어. \n\n 그러니 제가 저를 직접 내보이기는 아직도 부끄럽기에, 이번에는 마치 셀프 타이틀 같지 않은 셀프 타이틀 앨범 [HM]에 열한 곡의 노래들을 엮었습니다. \n\n 언제는 외로움에 어찌할 바를 모르다가도 또 가끔은 초연해지는, 저 그리고 모두가 가진 본연의 모습을 담고 싶었습니다.
\n
  하나 : 새벽에, 혼자, 어둡게 그리고 정말 크게 들어주세요.

  둘 : 후회하고 슬퍼하세요. 그래도 어디 한편에는 희망이 남아있습니다. 도대체 왜인지는 모르겠습니다만.

  셋 : 떠나야 합니다. 사라져야 합니다. 하지만 붙잡아주세요. 울어주세요. 티 내서 말하고 싶진 않았어요.

  넷 : 가짜 사랑 노래. 미리 추워져서 다 숨어버리고 나만 남았을 때.

  다섯 : 노력해도 쓸모없고, 숨을 들이쉴 때마다 목이 막히고, 선한 행동이 오히려 적을 낳을 때. 모두 씻겨줄 비가 내린다면.

  여섯 : 기묘한 꿈 뒤에 찾아오는 현실에 갑자기 서러워졌다.

  일곱 : 오롯이 혼자 있는 시공간은 나의 친구이자 선생님이며 거울이다. 너그럽게, 조용히, 그리고 확실하게.

  여덟 : 비염 치료제. 가장 더운 날에 가장 추운 나를 만나게 될 너.

  아홉 : A는 돈을 좇고, B는 권력을 좇고, C는 내 집 마련을 좇고, 나는 그런 그들을 좇고.

  열 : 괜찮아, 상관없어, 걱정하지 마. 거기에선 말이야. 다 거짓말이야.

  열하나 : 소름 끼치게 대단한 어떤 것들을 상상하세요. 그리고 그것들이 사그라지는 모습을 이어 그리세요. 끝.`,
    descriptionEn: `To me, my songs are a kind of armour.
They let me face myself—reshape the conflict inside me, mostly loneliness and self-reproach—into something more revealing.

I’m still not quite brave enough to show myself fully. So instead, I put together eleven songs into a self-titled album that doesn’t really feel self-titled: [HM].

It holds a version of myself I wanted to share—moments of loneliness, but also strange calm. Something I believe we all carry.

One.
Play this in the dead of night.
Alone. In the dark. And turn it up—loud.

Two.
Regret. Mourn.
Somehow, a flicker of hope always remains somewhere.
Though I have no idea why.

Three.
You have to leave. You have to vanish.
But please—hold on. Cry.
I didn’t want to say it out loud.

Four.
A fake love song.
When the cold arrives too soon, and everyone hides—leaving me alone.

Five.
You try, but it’s pointless.
Each breath catches in your throat.
Kindness breeds enemies.
If only a rain would come—to wash it all away.

Six.
A strange dream breaks.
And the sudden return to reality feels unbearably tender.

Seven.
Being truly alone in space and time—
it becomes your friend, your teacher, your mirror.
Generously, in Silence but definitely.

Eight.
Like an allergy cure.
You’ll meet the coldest me on the hottest day.

Nine.
A chases money.
B chases power.
C chases a home.
And I chase them all.

Ten.
It’s fine. It doesn’t matter. Don’t worry.
There, there, therein.
But it’s all a lie.

Eleven.
Picture something stunning, something that chills you to the bone.
Now imagine it fading.
The End.`,
    credits: `Produced by HIMINN, Shinhwan
Recorded by Shinhwan @ Phoné Studio
Mixed & Mastered by Shinhwan @ Phoné Studio
Artwork by namu 나무`,
    tracks: [
      {
        trackNo: 1,
        titleKr: "Intro ; HNNNN",
        titleEn: "Intro ; HNNNN",
        lyrics: null,
        tags: [],
      },
      {
        trackNo: 2,
        titleKr: "Fool’s Box (HM Ver.)",
        titleEn: "Fool’s Box (HM Ver.)",
        lyrics: `
그냥 알렴

그냥 울렴

이미 늦었으니까

열린 상자를

닫아보려 해도

이미 떠났으니까


그저 웃어

주저 앉아

이미 가버렸으니까


너는 알아 너는 항상

후회하고 늦어버려

똑같은 실수를

반복할 걸 알잖니


그래도 어느 한구석에

희망은 왜 남아


소릴 질러

울부짖는

이미 못 잊으니까


놓친 그들을

잡아보려 해도

이미 놓쳤으니까`,
        tags: [],
      },
      {
        trackNo: 3,
        titleKr: "물감",
        titleEn: "PaintMe,PaintYou",
        lyrics: `이젠 (그만) 사라져야겠지

마치 아무것도 아닌

(내 자린 없어)

남아있지 않은


이젠 (뒤돌아 보지말고) 떠나가야겠지

저 호수에 비치는

(발 디딜 수 없어)

달을 따라가는


난 좀 더 오래 있고 싶었어

난 그렇게 머물고 싶었어


그저 흐르고 싶어

그려지고 싶어

네 웃음이 되고 싶어

물감이 되고


난 좀 더 오래 있고 싶었어

난 그렇게 머물 줄 알았어


그저 흐르고 싶어

그려지고 싶어

네 웃음이 되고 싶어

물감이 되고


가지마

가지 말라고 말해줘

울지마

울지 말라고 말해줘

돌아와

붙잡아달라고 말해줘

울어줘

울어달라고 말해줘


그려줘

물감이 되어 그려줘

그려줘

그림이 되어 남아줘`,
        tags: [],
      },
      {
        trackNo: 4,
        titleKr: "가울",
        titleEn: "Wintumn",
        lyrics: `겨울같이 가을이 오면

잡았던 두 손을 놓게 하고

모두가 사라진 아침

태우던 담배만 재가 남는걸


겨울같이 가을이 오면

낡은 내 신발 속엔

소복이 쌓인 눈 속엔

얼어붙은 낙엽이 부서지진 않겠지


겨울같이 가을이 오면

코가 시려도 잡아줄 이 없고

이른 잠에 빠진 그들의

싸늘한 언덕만 내다보았지


겨울같이 가을이 오면

낡은 내 신발 속엔

소복이 쌓인 눈 속엔

얼어붙은 낙엽이 부서지진 않겠지


나는 미리 얼어붙어 더 이상 잇지 못할 것 같아

차가운 눈길에 마주하거나 주저앉을 겨를도 없는데


언젠가 언젠가

가을같이 겨울이 오면

소풍처럼 그렇게 와`,
        tags: [],
      },
      {
        trackNo: 5,
        titleKr: "Downpour",
        titleEn: "Downpour",
        lyrics: `All the efforts you’ve made, won’t be made

All the love you’ve tried, won’t be made out

When every bad thought kicks in your heart

Then it rains

A downpour will wash away


Downpour

Downpour

Downpour

Will wash away


Hesitation holds you back, but you try to go further

Big ideas take you in, but that’s not gonna happen

The more breath you take, the more it chokes

When it rains

A downpour will wash away


Downpour

Downpour

Downpour

Will wash away


Good intention goes to nothing and only the foes remain

You’ve craved everything but the gains peter out

When not just the remorse but pain defines you

Then it rains

A downpour will wash away


Downpour

Downpour

Downpour

Will wash away


Downpour

Downpour

Downpour

Will wash away


Will wash away`,
        tags: ["Title"],
      },
      {
        trackNo: 6,
        titleKr: "기묘한꿈을꾸었다 Pt.1",
        titleEn: "DreamtAStrangeDream Pt.1",
        lyrics: `기묘한 꿈을 꾸었다

그것은 눈이 무릎까지 쌓인 산이었는데

사람들이 마치

출근 시간에 붐비는 보도 위처럼

위를 향해 느릿느릿 걸어 올라가고 있었다

누군가 나를 찾고 있었다

그들은 나의 가족이었는데

정확하게 아버지나 동생이 아니었다

나는 그들이 나를 찾지 못하도록 몸을 낮추어

아래쪽을 향해 내려갔다


곧 나무판자로 얼기설기 만든 집이 나왔다

불안해 보이는 나무 계단을 올라가

문 같지 않은 문을 열고 들어갔다

벽을 따라 놓인 긴 쇼파에 마침

한 자리가 비어 거기 앉았다

그때 유일한 테이블을 차지한 사람이 고개를 돌렸는데

그 사람은

아무 말 없이 다시 고개를 되돌렸다

그러자 나는 그 사람이 무엇을 하는지 궁금해졌다

사람은 큰 종이에 그림을

글씨 쓰듯이 그리고 있었다

사람은 털장갑을 낀 손으로

연필을 쥐고 있었다

그런 손으로 잘도 그린다고 생각했는데

사람은 패딩에 목도리까지 했으면서도 양말을

벗어 놓고 있었다

순간 난 이것이 꿈이기에

꿈이기에


참 이상한 일이라 생각했다


옆에 앉은 남자가 나에게 지도를 펼쳐 보이면서

정상으로 가는 길을 물었다

나는 모른다고 말하려다 그 남자의 따귀를 때렸다

남자는 다시 지도를 보고

나는 그림을 그리는 사람의 뒷모습을 보는데

갑자기 서러웠다

서러워졌다`,
        tags: [],
      },
      {
        trackNo: 7,
        titleKr: "there’sONLYleftatinySPACEforyoubutit’sfine",
        titleEn: "there’sONLYleftatinySPACEforyoubutit’sfine",
        lyrics: `넌 그저 외로운 삶을 사는 걸

Be quarantined under your mind

Nobody nobody stands along

But don't try to prove your presence


Staying in the middle of a large hall alone

now enjoy the mood

It's your home, keep relying on

Find your path back here sooner


In a fake + mere relationship

if you're willing to spare your place

That's the moment when it grows

And go deep in yourself


Now crawl into your space generously in silence but definitely


넌 그저 외로움 속에 사는 걸

Be quarantined under your mind

Nobody nobody rings your doorbell

But don't try to prove your presence


Crawl into your space generously in silence but definitely

Crawl into your space generously in silence but definitely

Crawl into your space generously in silence but definitely`,
        tags: [],
      },
      {
        trackNo: 8,
        titleKr: "여름만있는날에살고싶은걸?",
        titleEn: "WishItWereSummer?",
        lyrics: `나의 단어들을 흘려

나의 단어들을 흘려 부을 때


우리는 한 해 중 가장 더운 날에 만나

그러는 한 너는 가장 추운 나를 만나


여름만 있는 날에 살고 싶은걸


나의 단어들을 흘려

나의 단어들을 흘려 부을 때


우리는 한 해 중 가장 더운 날에 만나

그러는 한 너는 가장 추운 나를 만나


여름만 있는 날에 살고 싶은걸


나는 너를 기억하지, 만나지 않아야 할 사람


우리는 한 해 중 가장 더운 날에 만나

그러는 한 너는 가장 추운 나를 만나


우리는 한 해 중 가장 더운 날에 만나

Someone settles, somebody stays

그러는 한 너는 가장 추운 나를 만나

Someone settles, somebody stays


여름만 있는 날에 살고 싶은걸

여름만 있는 날에 살고 싶은걸?`,
        tags: [],
      },
      {
        trackNo: 9,
        titleKr: "Outstrip",
        titleEn: "Outstrip",
        lyrics: `In a moment

you outdo, my competitors

In a moment

I only follow your back


Solely, be my side be my side

Now you outstrip me

Indeed


Bought a house, without rent

Oh you could, yeah you deserve

I would just be born as a snail

Born to have shell


Solely, be my side be my side

Now you outstrip me

Indeed


Spare me some, release me from

From the structural suppression


Solely, be my side be my side

Now you outstrip me

Indeed`,
        tags: [],
      },
      {
        trackNo: 10,
        titleKr: "거짓말거긴말",
        titleEn: "ThereinLiesTheLie",
        lyrics: `그 어둔 솜에 나는 파묻혀

거짓말을 내뱉어


넌 괜찮을 테니

아프다고 지껄여

넌 상관없을 테니

괴롭다고 말해줘


그 어둔 솜에 나는 파묻혀

난 다시 중얼거리지


끝도 없는 거짓말들

난 또 중얼거리지

끝도 없는 거짓말을

끝도 없이 거긴 말야


그 어둔 속에 나는 파묻혀

거짓말을 내뱉어


난 괜찮을 테니

버겁고 또 즐거워

난 상관않을 테니

걱정 말라고 전해줘`,
        tags: ["Title"],
      },
      {
        trackNo: 11,
        titleKr: "SomethingMagnificent",
        titleEn: "SomethingMagnificent",
        lyrics: `Something magnificent

won’t last long

And something magnificent

won’t stand strong


As it disappears

into a swirling

As it disappears

into a swirling sea


Something magnificent

won’t last long

And something magnificent

won’t stand strong


As new borns flourish

soon will perish

As new borns flourish

soon will perish and be gone


Something magnificent

won’t last long

And something magnificent

won’t stand strong


As it disappears

into a swirling

As it disappears

The melody only remains`,
        tags: [],
      },
    ],
  },
  {
    targetCarousel: { carouselIndex: 2, slideIndex: 1 },
    type: "remix",
    year: 2023,
    titleKr: "HM REMIXES",
    titleEn: "HM REMIXES",
    image: diskImages.hmRemixes,
    urls: {
      bandcamp: "https://himinnn.bandcamp.com/album/hm-remixes",
      spotify: "https://open.spotify.com/album/6sZOYYAqwlNCGFk3KW3eer",
      youtubeMusic:
        "https://music.youtube.com/playlist?list=OLAK5uy_n15Y0EmjAPYC_ItooG5FUzupx3iLrnR9w&si=apLSAEUun9LnEEeF",
      appleMusic: "https://music.apple.com/us/album/hm-remixes/1692310589",
      melon: "https://www.melon.com/album/detail.htm?albumId=11266123",
      bugs: "https://music.bugs.co.kr/album/20571787",
      genie: "https://www.genie.co.kr/detail/albumInfo?axnm=83923238",
    },
    isCD: false,
    descriptionKr: `HIMINN 의 정규 앨범 [HM] 의 수록곡을 다른 뮤지션들의 손으로 재조립한 리믹스 앨범

“내밀한 이야기는 자랑하듯이 내놓았으면서
부탁하는 소리는 당당하게 못 내지르는 놈이
누군가 먼저 내밀어 주는 덕에 어째 얼기설기

그렇게 얄팍한 돌아보기는 말없이 대화가 되고
노래는 분해되고 엉겨 붙고 뒤틀리고 달라지고
나는 어영부영 남의 이름들에 기대 또 노래를 내

이제 우린 슬픈 노래였던 것에 발을 구르고 손뼉을 치고 춤을 춰
알지도 못할 것에 속으로만 야성을 지르고
즐겁게 즐거웁게 춤을.”`,
    descriptionEn: `A remix album where songs from HIMINN’s full-length album [HM]
are taken apart and reassembled by the hands of other musicians.

“I laid my most intimate stories out like trophies,
yet couldn’t bring myself to ask for help with any pride.
Somehow, things held together, thanks to a hand someone else offered first.

That shallow kind of reflection became a quiet conversation.
Songs broke apart, stuck back together, twisted and changed.
And I, fumbling along, released another song leaning on someone else’s name.

Now we stomp our feet and clap our hands to what once was a sad song.
We howl wildness inside for things we don’t even understand.
And dance—joyfully, joyfullier—into it all.”`,
    credits: `Produced by HIMINN
Composed by HIMINN
Lyrics by HIMINN (Track 2-9), 개옹 (Track 9)
Arranged by Each Artist

Originally recorded by Shinhwan @ Phoné Studio
Remixed by Each Artist
Mastered by Each Artist

Artwork by HIMINN`,
    tracks: [
      {
        trackNo: 1,
        titleKr: "Intro ; HNNNN (Hidden Lime Remix)",
        titleEn: "Intro ; HNNNN (Hidden Lime Remix)",
        lyrics: null,
        tags: [],
      },
      {
        trackNo: 2,
        titleKr: "물감 (Irn Remix)",
        titleEn: "PaintMe,PaintYou (Irn Remix)",
        lyrics: `이젠 (그만) 사라져야겠지

마치 아무것도 아닌

(내 자린 없어)

남아있지 않은


이젠 (뒤돌아 보지말고) 떠나가야겠지

저 호수에 비치는

(발 디딜 수 없어)

달을 따라가는


난 좀 더 오래 있고 싶었어

난 그렇게 머물고 싶었어


그저 흐르고 싶어

그려지고 싶어

네 웃음이 되고 싶어

물감이 되고


난 좀 더 오래 있고 싶었어

난 그렇게 머물 줄 알았어


그저 흐르고 싶어

그려지고 싶어

네 웃음이 되고 싶어

물감이 되고


가지마

가지 말라고 말해줘

울지마

울지 말라고 말해줘

돌아와

붙잡아달라고 말해줘

울어줘

울어달라고 말해줘


그려줘

물감이 되어 그려줘

그려줘

그림이 되어 남아줘`,
        tags: [],
      },
      {
        trackNo: 3,
        titleKr: "물감 (Hidden Lime Remix)",
        titleEn: "PaintMe,PaintYou (Hidden Lime Remix)",
        lyrics: `이젠 사라져야겠지

마치 아무것도 아닌

남아있지 않은


이젠 떠나가야겠지

저 호수에 비치는

달을 따라가는


난 좀 더 오래 있고 싶었어

난 그렇게 머물고 싶었어


그저 흐르고 싶어

그려지고 싶어

네 웃음이 되고 싶어

물감이 되고


난 좀 더 오래 있고 싶었어

난 그렇게 머물 줄 알았어


그저 흐르고 싶어

그려지고 싶어

네 웃음이 되고 싶어

물감이 되고`,
        tags: ["Title"],
      },
      {
        trackNo: 4,
        titleKr: "가울 (Suheeson Remix)",
        titleEn: "Wintumn (Suheeson Remix)",
        lyrics: `겨울같이 가을이 오면

잡았던 두 손을 놓게 하고

모두가 사라진 아침

태우던 담배만 재가 남는걸


겨울같이 가을이 오면

낡은 내 신발 속엔

소복이 쌓인 눈 속엔

얼어붙은 낙엽이 부서지진 않겠지


겨울같이 가을이 오면

코가 시려도 잡아줄 이 없고

이른 잠에 빠진 그들의

싸늘한 언덕만 내다보았지


겨울같이 가을이 오면

낡은 내 신발 속엔

소복이 쌓인 눈 속엔

얼어붙은 낙엽이 부서지진 않겠지


나는 미리 얼어붙어 더 이상 잇지 못할 것 같아

차가운 눈길에 마주하거나 주저앉을 겨를도 없는데


가을같이 겨울이 오면

소풍처럼 그렇게 와`,
        tags: [],
      },
      {
        trackNo: 5,
        titleKr: "가울 (baan Remix)",
        titleEn: "Wintumn (baan Remix)",
        lyrics: `겨울같이 가을이 오면

잡았던 두 손을 놓게 하고

모두가 사라진 아침

태우던 담배만 재가 남는걸


겨울같이 가을이 오면

낡은 내 신발 속엔


겨울같이 가을이 오면

잡았던 두 손을 놓게 하고

모두가 사라진 아침

태우던 담배만 재가 남는걸


겨울같이 가을이 오면

낡은 내 신발 속엔

내 신발 속엔


신발 속엔

겨울같이 가을이 오면

낡은 내 신발 속엔

겨울같이 가을이 오면

낡은`,
        tags: [],
      },
      {
        trackNo: 6,
        titleKr: "Downpour (Hidden Lime Remix)",
        titleEn: "Downpour (Hidden Lime Remix)",
        lyrics: `All the efforts you’ve made, won’t be made

All the love you’ve tried, won’t be made out

When every bad thought kicks in your heart

Then it rains

A downpour will wash away


Downpour

Downpour

Downpour

Will wash away


Hesitation holds you back, but you try to go further

Big ideas take you in, but that’s not gonna happen

The more breath you take, the more it chokes

When it rains

A downpour will wash away


Downpour

Downpour

Downpour

Will wash away


Good intention goes to nothing and only the foes remain

You’ve craved everything but the gains peter out

When not just the remorse but pain defines you

Then it rains

A downpour will wash away


Downpour

Downpour

Downpour

Will wash away


Downpour

Downpour

Downpour

Will wash away


Will wash away`,
        tags: [],
      },
      {
        trackNo: 7,
        titleKr: "there'sONLYleftatinySPACEforyoubutit'sfine (HIMINN Remix)",
        titleEn: "there'sONLYleftatinySPACEforyoubutit'sfine (HIMINN Remix)",
        lyrics: null,
        tags: [],
      },
      {
        trackNo: 8,
        titleKr: "Outstrip (Guinneissik Remix)",
        titleEn: "Outstrip (Guinneissik Remix)",
        lyrics: `In a moment

you outdo, my competitors

In a moment

I only follow your back


Bought a house, without rent

Oh you could, yeah you deserve

I would just be born as a snail

Born to have shell


Solely, be my side be my side

Now you outstrip me


Indeed`,
        tags: [],
      },
      {
        trackNo: 9,
        titleKr: "거짓말거긴말 (Hidden Lime Remix)",
        titleEn: "ThereinLiesTheLie (Hidden Lime Remix)",
        lyrics: `그 어둔 솜에 나는 파묻혀

거짓말을 내뱉어


넌 괜찮을 테니

아프다고 지껄여

넌 상관없을 테니

괴롭다고 말해줘


그 어둔 솜에 나는 파묻혀

난 다시 중얼거리지


끝도 없는 거짓말들

끝도 없는 거짓말을

난 또 중얼거리지`,
        tags: [],
      },
    ],
  },
];

const diskOthersData: Disk[] = [
  {
    targetCarousel: { carouselIndex: 3, slideIndex: 1 },
    type: "single",
    year: 2025,
    titleKr: "The Monkey/Mother-ship",
    titleEn: "The Monkey/Mother-ship",
    image: diskImages.foolsbox,
    urls: {
      bandcamp: "",
      spotify: "",
      youtubeMusic: "",
      appleMusic: "",
      melon: "",
      bugs: "",
      genie: "",
    },
    isCD: false,
    descriptionKr: `미디어는(우리는) 치사랑에 대해 말하기 참 어려워해요.

부모가 자식을 사랑하는 건 당연하고 아름답게 그려지지만,
자식이 부모를 바라보는 감정은 종종 생략되거나, 하나의 덕목으로 강요됩니다.
내리사랑과 치사랑 사이의 이 공백 속에서,
‘애착’은 감히 무엇이라 단언할 수 있을까요?


두 엄마 사이에 선 아가 원숭이(들)는
우리를 돌보지만 차가운 존재, 동시에 따뜻하지만 비어 있는 존재 그 사이를 떠다닙니다.

해리 할로우가 행한 유명한 애착 실험의 내용을 빌려,
‘사랑의 발동 조건’을 물어보려 했습니다.`,
    descriptionEn: `Filial love is something the media (or we) rarely knows how to talk about.

While a parent's love for their child is often depicted as natural and beautiful,
a child's feelings toward their parent are frequently omitted—or else imposed as a moral obligation.
In the space between love flowing downward and love reaching upward,
how can we even begin to define 'ATTACHMENT'?


The baby monkey(s) standing between two mothers,
float between a caregiver who is cold yet dependable,
and one who is warm but hollow.

Borrowing from Harry Harlow’s famous attachment experiment,
I tried to ask: What sets love in motion?`,
    credits: `Produced by HIMINN
Composed by HIMINN
Lyrics by HIMINN
Arranged by HIMINN

Vocal by HIMINN
All instruments performed and programmed by HIMINN

Recorded at Phoné Studio
Mixed & Mastered by Shinhwan at Phoné Studio
Artwork by namu 나무, HIMINN`,
    tracks: [
      {
        trackNo: 1,
        titleKr: "The Monkey/Mother-ship",
        titleEn: "The Monkey/Mother-ship",
        lyrics: `Have I been thrown away?

In a six-sided mirrored room

Stand in an aisle

2 mothers in my view


My twin, you’ve grown up quite a lot

Then haven’t I?

Stand in an aisle

2 mothers in my view


Floating inside the mothership

Cold, artificial mother’s milk

Warm you is the other thing

Can’t tell fake from real


Floating inside the mothership

Cold, artificial love

Warm you is the other thing

Compassion exceeds comfort


Oh, I was thrown away

but you are here now

Stand in an aisle

We few happy family`,
        tags: [],
      },
    ],
  },
  {
    targetCarousel: { carouselIndex: 3, slideIndex: 2 },
    type: "single",
    year: 2022,
    titleKr: "Fool's Box",
    titleEn: "Fool's Box",
    image: diskImages.foolsbox,
    urls: {
      bandcamp: "https://himinnn.bandcamp.com/track/fools-box",
      spotify: "https://open.spotify.com/album/0zgMzssJeHA3mWyFNwocUv",
      youtubeMusic:
        "https://music.youtube.com/playlist?list=OLAK5uy_kVN0sP1ZwefTWgbRFdQ5WBqm8uWfhdS24&si=PRvqNGveBTI1m6nO",
      appleMusic:
        "https://music.apple.com/kr/album/fools-box-single/1637595736",
      melon: "https://www.melon.com/album/detail.htm?albumId=11021023",
      bugs: "https://music.bugs.co.kr/album/20483940",
      genie: "https://www.genie.co.kr/detail/albumInfo?axnm=82869798",
    },
    isCD: false,
    descriptionKr: `진부하고 진부한 판도라의 상자 이야기를 빗대어 말하고 싶었습니다.
후회하세요, 그리고 슬퍼하세요.

그래도 희망은 남아있습니다, 도대체 왜인지 모르겠지만.

아무쪼록 저는 말이죠,
여전히 같이 울기로 마음먹었습니다.`,
    descriptionEn: `I wanted to allude to that tired, old tale of Pandora’s box.
Do regret, and Do grieve.

Still—hope remains.
For reasons I’ll never quite understand.

Anyway, as for me,
I’ve decided I’ll keep crying with.`,
    credits: `Produced by Shinhwan @ Phoné Studio, HIMINN
Recorded by Shinhwan @ Phoné Studio
Mixed & Mastered by Shinhwan @ Phoné Studio
Artwork by Hansaem Park

Composed by HIMINN
Lyrics by HIMINN
Arranged by HIMINN
Vocal by HIMINN`,
    tracks: [
      {
        trackNo: 1,
        titleKr: "Fool's Box",
        titleEn: "Fool's Box",
        lyrics: `그냥 알렴

그냥 울렴

이미 늦었으니까

열린 상자를

닫아보려 해도

이미 떠났으니까


그저 웃어

주저 앉아

이미 가버렸으니까


너는 알아 너는 항상

후회하고 늦어버려

똑같은 실수를

반복할 걸 알잖니


그래도 어느 한구석에

희망은 왜 남아


소릴 질러

울부짖는

이미 못 잊으니까


놓친 그들을

잡아보려 해도

이미 놓쳤으니까`,
        tags: [],
      },
    ],
  },
  {
    targetCarousel: { carouselIndex: 3, slideIndex: 3 },
    type: "EP",
    year: 2021,
    titleKr: "In The Need Of A Good Cry",
    titleEn: "In The Need Of A Good Cry",
    image: diskImages.firstEP,
    urls: {
      spotify:
        "https://open.spotify.com/album/7H2JpgtWZ0wYBfaJf75VOF?si=lB8D3YRESCGc186322_1Dw",
      youtubeMusic:
        "https://music.youtube.com/playlist?list=OLAK5uy_lVmPPnoad9olmyrexgevdzSsSyeJ0d5mM&si=Qbcxm0NXYzlcDwgt",
      appleMusic:
        "https://music.apple.com/us/album/in-the-need-of-a-good-cry-ep/1569826606",
      melon: "https://www.melon.com/album/detail.htm?albumId=10607746",
      bugs: "https://music.bugs.co.kr/album/20396693",
      genie: "https://www.genie.co.kr/detail/albumInfo?axnm=82045830",
    },
    isCD: false,
    descriptionKr: `눈물을 흘리는 것은 나약한 일일까? 그렇다 듣고, 또 그렇게 알며 살아왔다.

그러나 이제는 좋은 울음에 대해 이야기해보고 싶다.

달아오르는 눈시울을 자랑스럽게 여기지는 못해도 숨기지는 않겠다.

거창한 무언가를 해내겠다는 것은 아니다.

그저 담담하게 나의 이야기를, 동시에 어딘가 있을 또 다른 누군가들의 이야기를 적고 멜로디를 이었다.

그렇게 고독과 우울함, 반성과 부끄러움을 담은 다섯 곡을 엮어 ‘좋은 울음'에 대한 나름의 고민을 정리했다.

...

1. Intro ; Extra

아주 천천히, 하지만 묵직하게 앨범의 시작을 여는 곡이다.

‘내 딸아. 너는 색깔을 알아볼 수 없으니 세상을 바라볼 수 있겠느냐? 고로 특별해지려 하지 말거라, 내가 세상을 살아봐서 세상을 알기 때문이란다.’

누구보다 평범하게 살기를 바라왔지만 평범한 것이 제일 힘든 것임을. 범인(凡人)이 되지 못한다면 선택지는 두 가지이다.

세상의 주연이 되거나 엑스트라가 되거나.

아버지로 대표되는 절대자는 나에게 비범함을 좇지 말라 했다.

그래서 나는 선택했다, 엑스트라로 남을 것을. 하지만 ‘extraordinary’하게 살 것을.

이 노래가 리버스된 샘플의 심연을 돌다 기타와 피아노가 들어오며 화음을 찾고 갈피를 잡는 것처럼.


2. Only Space

오래전부터 고독에 대한 이야기를 하고 싶었다.

혼자되는 것을 무서워하는 사람들, 고독을 고통으로 받아들이는 사람들을 자주 봐오며 가진 생각이다.

나의 부족함으로 인해 고독 이야기가 정체되던 와중 책을 선물받았다.

라이너 마리아 릴케가 시인을 꿈꾸던 프란츠 크사버 카푸스와 나눈 편지를 엮은 〈젊은 시인에게 보내는 편지〉.

릴케는 내가 모르는 것을 알고 있었고 그녀의 말을 빌려 내 이야기를 채워 나가기로 했다.

고독은 피해야 하는 것이 아니다. 사람은 외로이 있을 때 심장 가장 깊은 곳을 파고들 수 있게 된다.

수많은 고민에 대한 해답은 그 아래 침전물 속에 있고. 고로 고독은 친구이자 선생님이며 거울이다.

곡의 시작부터 끝없이 이어지는 불협화음은 처음엔 부담스레 다가올지라도 이내 그 속을 유영하는 스스로를 발견할 수 있게 할 것이다.

외로움도 마찬가지이다. 오롯이 혼자 있는 시공간은 처음엔 나를 옥죄는 것처럼 보이지만, 곧 나의 가장 깊은 곳을 자유롭게 떠돌아다닐 수 있게 한다.

중후반부터 시작되는 제임스 블레이크 스타일의 공격적인 신디사이저 소리와 몸을 타고 울리는 극저음, 점점 강렬해지는 드럼 사운드를 통해 감히 라디오헤드와 포티스헤드의 곡들이 주는 무아지경을 흉내내보고 싶었다.

이 곡을 듣는 사람들도 노래가 주고 있는 그 무아지경 속에 빠져 ‘나만의 공간으로 너그럽게 조용히 하지만 확신에 차서 들어가는’ 기회를 가졌으면 한다.


3.  ≒  (가을같은겨울)

나도 사랑을 노래하고 싶었다. 하지만 이 노래는 사랑을 이야기하지 않는다.

‘≒(가을같은겨울)'은 내가 가장 처음 만든 노래이다.
이 곡을 처음 만들기 시작했을 때는 연애에 관한 가사들로 채워져 있었다.

하지만 일련의 사건들로 인해 나에게 사랑이란 단어는 고통의 범주에 들어가 버린 어떤 것이 되었고 이 노래는 결국 사랑을 이야기하지 못했다.

사랑이 무엇인지 모르게 되었다.
아니, 예전에 알고 있던 그것이 사랑이었는지조차 모르겠다.

연애 이야기를 떠벌리기에 나는 너무 부끄러운 몸이 되었다. 그렇다고 멈출 수는 없었다.
수치스러움과 고통을, 여타 사랑의 찌꺼기들을 창작의 원동력으로 삼았다.

그렇게 사랑의 부산물들을 주워담은 나의 ‘부끄러운’ 첫 노래는 인간의 외로움과 우울함을 말하게 되었고, 두 가지의 새로운 감정은 나의 지향점이 되었다.

7살이 된 이 노래는 어쿠스틱 기타 한 대로 시작해서 여러 번의 편곡 과정을 거쳤는데, 본 이베어 특유의 중첩된 보컬 사운드와 욘시, 비욬의 음악이 주는 감성을 좋아한다면 이 노래도 좋아할 것이다.


4. 엔터테이나

이 노래는 반성의 노래이다.

이유가 기억나지 않는 고민에 빠져있던 나에게 친구는 티켓을 하나 선물해줬다. 동춘서커스 입장권.

이게 뭐냐고 코웃음치던 나는 시간이나 때울 겸 다음날 저녁 공연장으로 가 자리에 앉았다.

조명이 켜지고 한참 뒤 다시 조명이 꺼졌다.

그날 밤 집으로 곧장 돌아온 나는 홀린 듯이 가사를 써내려갔다.

서커스 단원들의 노력은 진짜였고 나의 그것은 가짜였다. 노래하는 척, 예술하는 척만 배우며 나는 살아왔다.

손발이 찢어져 피가 철철 흐를 정도로 무언가를 해본 적이 있던가? 그들은 있었고 나는 없었다.

부끄러웠다.

진짜 엔터테이너들을 본 후의 그 부끄러움을 조금이라도 만회하기 위해 난 그들처럼 노래하기로 생각했다.

그래서 난 그들을 빌어 ‘엔터테이너’에 대해 노래하고 싶었다.

마지막 남은 서커스단은 위험한 묘기를 매일 이어가면서도 내일을 생각해야한다.

단원들은 아슬아슬한 그네에 그들의 안전과 생계를 걸고 있다.

한 치 앞도 안 보이지만 당장 오늘은 무대에 올라야하는 삶.

세상 모든 엔터테이너들이 이와 비슷하게 살아가고 있지 않을까?

고된 삶이다. 하지만 나의 발걸음은 이미 그쪽을 향해있다.

’엔터테이나'는 기타 위주의 역동적인 익스페리먼탈 락을 표방하고 있으며 후렴구의 반복되는 가사를 통해 키치함을 살렸다.

정확히 다시 말하자면, 이 노래를 통해 나는 수 어 번 부르짖는다. ‘엔터테이나'가 되기로.


5. 다시 𝄇 다시

대부분의 사람들은 세상 앞에서 ‘무저항력’의 상태에 놓여본 적이 있다.

이유 없이 혼자가 된 것 같아 불 꺼진 천장만 바라볼 때,

무기력함에 스스로를 돌보지 않을 때,

일상을 벗어나려다 결국 똑같은 침대에서 다시 눈을 뜰 때,

타인과의 연락이 오늘따라 묘하게 기분 나쁠 때.

잊고 있던 어느 날에 눈을 떴을 때는 어설프게 해가 지고 있었다.

아무도 없는 어둑한 방에서 일어났더니 왠지 모를 우울한 기분이 나를 덮쳤다.

주문에 걸린 것처럼 잠이 덜 깬 채로 가사와 멜로디를 흥얼거렸다.

‘혼자 잠을 청하는 게 편할 때, 그래도 쉽게 잠들지 못할 때...’

담담하게 나머지 가사를 마음에서 글로 옮겼다.

보통 우울에 대해 말하는 노래들은 해결법을 주려 한다.

하지만 이 노래에서는, 위로하기 위해 안간힘을 쓰는 대신 그냥 나는 같이 울기로 마음먹었다.

소리를 크게 지르고 벗어나려 해보아도,

그다지 신경 쓰이지 않는다고 남들에게 거짓말을 해보아도,

설명할 수 없는 그 감정은 언젠가는 다시 우리를 감싼다.

그냥 그날 하루 정도 버리는 셈 치고 많은 것을 쉬이 받아들이기를.

맑은 날에도 커튼을 치고 침대 안으로 숨는 게 뭐가 그리 비겁하고 부끄러운 일인가.`,
    descriptionEn: `Is crying a sign of weakness?
That’s what I’ve heard, and what I’ve lived by.
But now, I want to talk about good crying.

Though I can’t proudly show my burning eyes,
I won’t hide them either.

I’m not trying to achieve anything grand.
Just calmly telling my story—
And the stories of others out there somewhere—
Weaving melodies from solitude, sadness, reflection, and shame.

Five songs that gather these feelings,
A personal meditation on what it means to cry well.

1. Intro ; Extra

I've always wished for an ordinary life, only to learn that being ordinary is the hardest thing. If I can’t be just another face in the crowd, the world offers two roles: the lead, or the extra. The Absolute—represented by my father—once told me, don’t chase the extraordinary.

So I made my choice: I would be an extra.
But I would live extraordinarily.

2. Only Space

For a long time, I’ve wanted to speak about solitude.
Watching people fear being alone, seeing loneliness treated as a wound, I’ve come to believe this: solitude is not the enemy.

When you’re truly alone, you can finally reach into the deepest parts of your own heart.
The answers we search for lie buried in that quiet sediment.
So solitude becomes a friend, a teacher, a mirror.

At first, being alone in time and space feels suffocating.
But soon, it gives your deepest self the freedom to roam.

3. ≒ (가을같은겨울)

I wanted to write a love song.
But this isn’t one.

Because of a series of events, love became something tangled with pain.
Now I don’t know what love even is.
Or if what I once thought was love ever really was.

I’ve become too ashamed to share stories of romance.
But I couldn’t stop writing either.

I’ve turned that shame and pain—the leftover scraps of something like love—into fuel for this song.

4. 엔터테이나

I once went to a circus.
The lights came on. Then, a while later, they went out.
That night, I went straight home and wrote lyrics like I was possessed.

What those performers gave was real.
What I’d been doing… felt fake.
I’d only learned how to pretend to sing, to pretend to create.

Had I ever done anything until my hands bled?

They had. I hadn’t.
And I was ashamed.

To make up for even a sliver of that shame, I decided:
I would sing like they do.

This song is a borrowed tribute to real entertainers.

Even as the last remaining circus troupe continues their dangerous stunts, they have to think about tomorrow.
They risk their safety and survival with every swing.
They can't see what's ahead—but today, they still have to take the stage.

Isn’t that the life of every entertainer?
A hard life.
But my steps are already heading that way.

5. 다시𝄇 다시

When you feel alone for no clear reason, staring at the ceiling in the dark—
When you’ve stopped caring for yourself—
When you try to escape your routine, only to wake up again in the same old bed—
When even a simple message from someone else just rubs you the wrong way.

One day, I woke up in a moment I’d forgotten.
The light was clumsy and soft, the sun just about to disappear.
As I sat in that dim, empty room, a wave of nameless sadness washed over me.

Most songs about sadness try to offer answers.
But this one doesn’t.

Instead of straining to comfort you, I decided to simply cry with you.

Even if we scream our heads off.
Even if we lie to others that we’re fine.

Eventually, that feeling will find its way back to us.

So for today, let’s give up just a little.
Let’s let things pass more easily.

Drawing the curtains on a sunny day and hiding in bed—
that’s not weakness.
That’s not shame.`,
    credits: `Produced by HIMINN
Recorded by HIMINN
Mixed by HIMINN
Mastered by Shinhwan
Artwork by 최정인

Composed by HIMINN
Lyrics by HIMINN
Arranged by HIMINN
Vocal by HIMINN
All Instruments by HIMINN`,
    tracks: [
      {
        trackNo: 1,
        titleKr: "Intro ; Extra",
        titleEn: "Intro ; Extra",
        lyrics: `Father once told me

Don’t try to be extraordinary

For you are colourblind

Don’t try to be extraordinary

I know the life, life.


Daughter

Don’t try to be extraordinary

For you are colourblind

Don’t try to be extraordinary

I know the life, life.`,
        tags: [],
      },
      {
        trackNo: 2,
        titleKr: "Only Space",
        titleEn: "Only Space",
        lyrics: `넌 그저 외로운 삶을 사는 걸

Be quarantined under your mind

Nobody nobody stands along

But don't try to prove your presence.


Staying in the middle of a large hall alone,

now enjoy the mood

It's your home, keep relying on

Find your path back here sooner.


In a fake＋mere relationship,

if you're willing to spare your place

That's the moment when it grows

And go deep in yourself.


Now crawl into your space,
generously in silence but definitely.


넌 그저 외로움 속에 사는 걸

Be quarantined under your mind

Nobody nobody rings your doorbell

But don't try to prove your presence.


Crawl into your space generously in silence but definitely

Crawl into your space generously in silence but definitely

Crawl into your space generously in silence but definitely.`,
        tags: ["Title"],
      },
      {
        trackNo: 3,
        titleKr: "≒ (가을같은겨울)",
        titleEn: "≒",
        lyrics: `겨울 같이 가을이 오면

잡았던 두 손을 놓게 하고

모두가 사라진 아침

태우던 담배만 재가 남는걸.


겨울 같이 가을이 오면

낡은 내 신발 속엔

소복이 쌓인 눈 속엔

얼어 붙은 낙엽이 부서지진 않겠지.



겨울 같이 가을이 오면

코가 시려도 잡아줄 이 없고

이른 잠에 빠진 그들의

싸늘한 언덕만 내다보았지.


겨울 같이 가을이 오면

낡은 내 신발 속엔

소복이 쌓인 눈 속엔

얼어 붙은 낙엽이 부서지진 않겠지.


미안해 괜찮아 고마워 알겠어.


언젠가, 언젠가.

가을 같이 겨울이 오면

소풍처럼 그렇게 와.`,
        tags: [],
      },
      {
        trackNo: 4,
        titleKr: "엔터테이나",
        titleEn: "엔터테이나",
        lyrics: `불은 곧 꺼지고 난 걸어서 등장하진 못해

조명이 너무 밝아 내 옷은 더욱 밝아야해

손을 꼭 비집고 날아, 날 놓지 말아야해

박수를 받는 지금도 내일을 생각해야해.


난 날고 싶다 그랬죠

이런 걸 말한 건 아니었는데.


나는 엔터테이나

난 만원 짜리 곡예사


나 하고 싶은 거 다 할거야

난 하고 싶은 거 더 할거야


내가 설 무대는 내가 옮길 거야

내가 설 무대는 내가 지을 거야

내가 선 무대는 내가 허물 거야

개미 하나 없는 빈 무대를 허물 거야.


난 날고 싶다 그랬죠

이런 걸 말한 건 아니었는데.


나는 엔터테이나

난 만원 짜리 곡예사


내가 발을 헛디뎌 떨어져도

내가 발을 헛디뎌 떨어져도

내가 발을 헛디뎌 떨어져도

거꾸로 날아가는 거라 해줘


나는 엔터테이나

난 만원 짜리 곡예사

나는 엔터테이나

난 만원 짜리 곡예사`,
        tags: ["Title"],
      },
      {
        trackNo: 5,
        titleKr: "다시 𝄇 다시",
        titleEn: "다시 𝄇 다시",
        lyrics: `혼자 잠을 청하는 게 편할 때

그래도 쉽게 잠들지 못할 때

곁에 아무도 없는 게 당연할 때

너무 쉽게 다른 사람을 안을 때.


거울을 바라본 지 오래됐을 때

그다지 신경 쓰지도 않는데

다친만큼 아파하지 않아도 될 때

여전히 습관을 쉽게 저버리는 게.


나서려던 문을 닫고

다시 웅크릴 때

다시 웅크리게

다시.


당장이라도 떠나버리고 싶을 때

약속을 잡는 건 즐겁지 않을 때

내일이 매일 같기를 바랄 때

그다지 신경 쓰지도 않는데.


구름이 망가진 걸 보았을 때

대화는 점점 가벼워질 때

연락이 오는 게 기쁘지 않을 때

책임을 지는 일에 버거워 지는 게.


나서려던 문을 닫고

다시 웅크릴 때

다시 웅크리게

다시.


태우던 담배가 너무나 쓰라릴 때

그다지 신경 쓰지도 않는데


나서려던 문을 닫고

다시 웅크릴 때

다시 웅크리게

다시.`,
        tags: ["Title"],
      },
    ],
  },
];

const diskOSTData: Disk[] = [
  {
    targetCarousel: { carouselIndex: 4, slideIndex: 1 },
    type: "ost",
    year: 2024,
    titleKr: "악마의 생선 OST",
    titleEn: "악마의 생선 OST",
    image: diskImages.devilFishDisk,
    urls: {
      bandcamp: "https://himinnn.bandcamp.com/album/mbc-ost",
    },
    isCD: false,
    descriptionKr: ``,
    descriptionEn: ``,
    credits: ``,
    tracks: [
      {
        trackNo: 1,
        titleKr: "미스터리",
        titleEn: "Mystery",
        lyrics: ``,
      },
      {
        trackNo: 2,
        titleKr: "성자와 악마",
        titleEn: "The Saint and the Devil",
        lyrics: ``,
      },
      {
        trackNo: 3,
        titleKr: "아귀와 감로",
        titleEn: "The Hungry Ghost and the Nectar",
        lyrics: ``,
      },
      {
        trackNo: 4,
        titleKr: "츠루시기리",
        titleEn: "Tsurushigiri",
        lyrics: ``,
      },
      {
        trackNo: 5,
        titleKr: "에스파냐",
        titleEn: "España",
        lyrics: ``,
      },
      {
        trackNo: 6,
        titleKr: "Pepe Vieira",
        titleEn: "Pepe Vieira",
        lyrics: ``,
      },
      {
        trackNo: 7,
        titleKr: "O Home Peixe",
        titleEn: "O Home Peixe",
        lyrics: ``,
      },
      {
        trackNo: 8,
        titleKr: "아구찜",
        titleEn: "Aguijjim",
        lyrics: ``,
      },
      {
        trackNo: 9,
        titleKr: "갈리시아",
        titleEn: "Galicia",
        lyrics: ``,
      },
      {
        trackNo: 10,
        titleKr: "Anglerfish",
        titleEn: "Anglerfish",
        lyrics: ``,
      },
      {
        trackNo: 11,
        titleKr: "End Credit",
        titleEn: "End Credit",
        lyrics: ``,
      },
    ],
  },
  {
    targetCarousel: { carouselIndex: 4, slideIndex: 2 },
    type: "ost",
    year: 2025,
    titleKr: "김밥의 천국 OST",
    titleEn: "김밥의 천국 OST",
    image: diskImages.gimbapDisk,
    urls: {
      bandcamp: "https://himinnn.bandcamp.com/album/music-for-a-documentary",
    },
    isCD: false,
    descriptionKr: ``,
    descriptionEn: ``,
    credits: ``,
    tracks: [
      {
        trackNo: 1,
        titleKr: "김밥의 천국",
        titleEn: "Gimbap Paradise",
        lyrics: ``,
      },
      {
        trackNo: 2,
        titleKr: "정식",
        titleEn: "Fine Meal",
        lyrics: ``,
      },
      {
        trackNo: 3,
        titleKr: "소풍",
        titleEn: "Picnic",
        lyrics: ``,
      },
      {
        trackNo: 4,
        titleKr: "충무",
        titleEn: "Chungmu",
        lyrics: ``,
      },
      {
        trackNo: 5,
        titleKr: "지옥",
        titleEn: "Hell",
        lyrics: ``,
      },
      {
        trackNo: 6,
        titleKr: "Unfrozen",
        titleEn: "Unfrozen",
        lyrics: ``,
      },
      {
        trackNo: 7,
        titleKr: "모던 타임즈",
        titleEn: "Modern Times",
        lyrics: ``,
      },
      {
        trackNo: 8,
        titleKr: "This is Kimbap",
        titleEn: "This is Kimbap",
        lyrics: ``,
      },
      {
        trackNo: 9,
        titleKr: "소울메이트",
        titleEn: "Soulmate",
        lyrics: ``,
      },
      {
        trackNo: 10,
        titleKr: "김.밥",
        titleEn: "Gim.bap",
        lyrics: ``,
      },
      {
        trackNo: 11,
        titleKr: "End Credit",
        titleEn: "End Credit",
        lyrics: ``,
      },
    ],
  },
];

export const DiskMetaDatas = {
  albumMetaDatas: diskAlbumData,
  othersMetaDatas: diskOthersData,
  ostMetaDatas: diskOSTData,
};

const allDisks: Disk[] = [...diskAlbumData, ...diskOSTData, ...diskOthersData];

const normalize = (s: string) =>
  s
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s/-]/gu, "") // 하이픈 `/`을 임시로 허용
    .replace(/[\/\s]+/g, "-") // 슬래시나 공백 → 하이픈
    .replace(/-+/g, "-") // 연속된 하이픈 정리
    .replace(/^-+|-+$/g, ""); // 양끝 하이픈 제거

export const DiskMetaMap: Record<string, Disk> = Object.fromEntries(
  allDisks.map((disk) => [normalize(disk.titleEn), disk])
);
