import { Word, WordProgress } from '../types/database';

export const SEED_USER_ID = '00000000-0000-0000-0000-000000000001';

export const COMPREHENSIVE_SEED_WORDS: Word[] = [
  {
    "id": "a1111111-1111-1111-1111-111111111111",
    "user_id": SEED_USER_ID,
    "word": "ephemeral",
    "normalized_word": "ephemeral",
    "simple_meaning": "Lasting for a very short time",
    "detailed_meaning": "Existing, occurring, or living for only a brief period; momentary or fleeting in nature.",
    "part_of_speech": "adjective",
    "example_sentence": "The beauty of the sunset was ephemeral, fading within minutes into twilight.",
    "synonyms": [
      "fleeting",
      "transitory",
      "momentary",
      "evanescent"
    ],
    "antonyms": [
      "permanent",
      "enduring",
      "perpetual",
      "eternal"
    ],
    "pronunciation": "/ɪˈfɛm.ər.əl/",
    "phonetic": "ih-FEM-er-uhl",
    "difficulty": "medium",
    "usage_context": "Frequently used in literature and philosophy to describe brief experiences, art, or emotions.",
    "memory_tip": "Think of \"ephemera\" — things like concert tickets or autumn leaves that are brief and quickly fade.",
    "created_at": "2026-10-24T07:18:29.154Z",
    "updated_at": "2026-10-24T07:18:29.156Z"
  },
  {
    "id": "a2222222-2222-2222-2222-222222222222",
    "user_id": SEED_USER_ID,
    "word": "pragmatic",
    "normalized_word": "pragmatic",
    "simple_meaning": "Dealing with things sensibly and realistically based on practical considerations",
    "detailed_meaning": "Solving problems in a way that suits real conditions rather than following rigid theories.",
    "part_of_speech": "adjective",
    "example_sentence": "She took a pragmatic approach to team management, prioritizing results over rigid dogma.",
    "synonyms": [
      "practical",
      "sensible",
      "realistic",
      "utilitarian"
    ],
    "antonyms": [
      "idealistic",
      "impractical",
      "dogmatic"
    ],
    "pronunciation": "/præɡˈmæt.ɪk/",
    "phonetic": "prag-MAT-ik",
    "difficulty": "medium",
    "usage_context": "Used in business, politics, and decision making where practical utility beats theoretical idealism.",
    "memory_tip": "Rhymes with \"automatic\" — think of solving problems with practical tools right in front of you.",
    "created_at": "2026-10-24T07:18:29.156Z",
    "updated_at": "2026-10-24T07:18:29.156Z"
  },
  {
    "id": "a3333333-3333-3333-3333-333333333333",
    "user_id": SEED_USER_ID,
    "word": "ubiquitous",
    "normalized_word": "ubiquitous",
    "simple_meaning": "Present, appearing, or found everywhere",
    "detailed_meaning": "Constantly encountered, widespread, or existing omnipresently in daily life.",
    "part_of_speech": "adjective",
    "example_sentence": "Smartphones have become ubiquitous in modern society, present in almost every pocket.",
    "synonyms": [
      "omnipresent",
      "pervasive",
      "universal",
      "widespread"
    ],
    "antonyms": [
      "rare",
      "scarce",
      "isolated",
      "uncommon"
    ],
    "pronunciation": "/juːˈbɪk.wɪ.təs/",
    "phonetic": "yoo-BIK-wih-tus",
    "difficulty": "medium",
    "usage_context": "Used to describe technology, cultural trends, or natural phenomena that are pervasive.",
    "memory_tip": "Sounds like \"you-be-everywhere\" — something found at every corner you look.",
    "created_at": "2026-10-25T07:18:29.156Z",
    "updated_at": "2026-10-25T07:18:29.156Z"
  },
  {
    "id": "a4444444-4444-4444-4444-444444444444",
    "user_id": SEED_USER_ID,
    "word": "tenacious",
    "normalized_word": "tenacious",
    "simple_meaning": "Tending to keep a firm hold of something; persistent and determined",
    "detailed_meaning": "Not easily stopped or pulled apart; demonstrating unrelenting resolve in the face of obstacles.",
    "part_of_speech": "adjective",
    "example_sentence": "Her tenacious spirit allowed her to finish the marathon despite severe muscle cramps.",
    "synonyms": [
      "persistent",
      "resolute",
      "determined",
      "unyielding"
    ],
    "antonyms": [
      "irresolute",
      "yielding",
      "wavering",
      "weak"
    ],
    "pronunciation": "/təˈneɪ.ʃəs/",
    "phonetic": "tuh-NAY-shus",
    "difficulty": "medium",
    "usage_context": "Complimenting someone who never gives up on a tough objective.",
    "memory_tip": "Tenacious people hold on with \"tenacity\" like the grip of ten fingers.",
    "created_at": "2026-10-25T07:18:29.156Z",
    "updated_at": "2026-10-25T07:18:29.156Z"
  },
  {
    "id": "a5555555-5555-5555-5555-555555555555",
    "user_id": SEED_USER_ID,
    "word": "serendipity",
    "normalized_word": "serendipity",
    "simple_meaning": "The occurrence of events by chance in a happy or beneficial way",
    "detailed_meaning": "Finding valuable or pleasant things not sought for; a fortunate stroke of luck.",
    "part_of_speech": "noun",
    "example_sentence": "Finding my favorite childhood book at a remote flea market was pure serendipity.",
    "synonyms": [
      "fluke",
      "good fortune",
      "providence",
      "lucky chance"
    ],
    "antonyms": [
      "misfortune",
      "design",
      "bad luck"
    ],
    "pronunciation": "/ˌser.ənˈdɪp.ə.ti/",
    "phonetic": "sair-en-DIP-ih-tee",
    "difficulty": "medium",
    "usage_context": "Used when celebrating pleasant surprises and unintended discoveries.",
    "memory_tip": "Think of \"serene dip\" — taking a calm dip into life and stumbling upon unexpected treasure.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000001-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Ricochet",
    "normalized_word": "ricochet",
    "simple_meaning": "To rebound or bounce off a surface at an angle",
    "detailed_meaning": "To bounce or glance off a surface, especially after striking it at an oblique angle (often referring to bullets, balls, or sound).",
    "part_of_speech": "verb",
    "example_sentence": "The tennis ball ricocheted off the wall and surprised the goalie.",
    "synonyms": [
      "rebound",
      "bounce",
      "glance",
      "deflect"
    ],
    "antonyms": [
      "absorb",
      "stick",
      "land",
      "halt"
    ],
    "pronunciation": "/ˈrɪk.ə.ʃeɪ/",
    "phonetic": "RIK-uh-shay",
    "difficulty": "medium",
    "usage_context": "Common in ballistics, sports, physics, and figurative descriptions of ideas jumping around.",
    "memory_tip": "Sounds like \"trick-o-shade\" — an energetic ball bouncing into the shade.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000002-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Dainty",
    "normalized_word": "dainty",
    "simple_meaning": "Delicately small, graceful, or pretty",
    "detailed_meaning": "Delicately beautiful or charming in size, shape, or craftsmanship; also used to describe fastidious eating habits.",
    "part_of_speech": "adjective",
    "example_sentence": "She served tea in dainty porcelain cups adorned with pale rosebuds.",
    "synonyms": [
      "delicate",
      "graceful",
      "petite",
      "exquisite"
    ],
    "antonyms": [
      "clumsy",
      "coarse",
      "heavy",
      "ponderous"
    ],
    "pronunciation": "/ˈdeɪn.ti/",
    "phonetic": "DAYN-tee",
    "difficulty": "easy",
    "usage_context": "Often used to describe teaware, pastries, jewelry, or light, refined footsteps.",
    "memory_tip": "Rhymes with \"rainy\" — imagine delicate raindrops falling on tiny flowers.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000003-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Despair",
    "normalized_word": "despair",
    "simple_meaning": "The complete loss or absence of hope",
    "detailed_meaning": "A deep state of hopelessness, dejection, or helplessness when facing insurmountable adversity.",
    "part_of_speech": "noun",
    "example_sentence": "Driven by despair after the harvest failed, the villagers sought aid from the capital.",
    "synonyms": [
      "hopelessness",
      "anguish",
      "despondency",
      "gloom"
    ],
    "antonyms": [
      "hope",
      "optimism",
      "joy",
      "cheerfulness"
    ],
    "pronunciation": "/dɪˈspeər/",
    "phonetic": "dih-SPAIR",
    "difficulty": "easy",
    "usage_context": "Literature, emotional dialogues, and psychological descriptions of grief.",
    "memory_tip": "De-pair: feeling separated and torn away from all reasons for hope.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000004-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Despise",
    "normalized_word": "despise",
    "simple_meaning": "To feel intense contempt or deep dislike for someone or something",
    "detailed_meaning": "To look down upon with utter disdain, abhorrence, or disgust; to regard as worthless or vile.",
    "part_of_speech": "verb",
    "example_sentence": "He despised dishonest politicians who made promises they had no intention of keeping.",
    "synonyms": [
      "loathe",
      "detest",
      "abhor",
      "scorn"
    ],
    "antonyms": [
      "admire",
      "cherish",
      "respect",
      "venerate"
    ],
    "pronunciation": "/dɪˈspaɪz/",
    "phonetic": "dih-SPYZ",
    "difficulty": "easy",
    "usage_context": "Expressing fierce disapproval, moral contempt, or personal aversion.",
    "memory_tip": "Des- + spice: hating something so much you feel like throwing rotten spice at it.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000005-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Appeasement",
    "normalized_word": "appeasement",
    "simple_meaning": "Pacifying or placating someone by giving in to their demands",
    "detailed_meaning": "The policy or act of satisfying grievances or yielding to aggressive demands in order to avoid conflict or war.",
    "part_of_speech": "noun",
    "example_sentence": "History lessons often debate whether British policy toward aggressive expansion was justified appeasement or disastrous weakness.",
    "synonyms": [
      "conciliation",
      "pacification",
      "placation",
      "concession"
    ],
    "antonyms": [
      "provocation",
      "defiance",
      "resistance",
      "confrontation"
    ],
    "pronunciation": "/əˈpiːz.mənt/",
    "phonetic": "uh-PEEZ-muhnt",
    "difficulty": "medium",
    "usage_context": "Historical and diplomatic discussions, especially concerning negotiations before major conflicts.",
    "memory_tip": "Appease = bring peace by yielding to a bully.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000006-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Silhouette",
    "normalized_word": "silhouette",
    "simple_meaning": "The dark outline or shadow of someone or something against a light background",
    "detailed_meaning": "A dark two-dimensional representation of an object or person filled with a solid color, typically black on a bright backdrop.",
    "part_of_speech": "noun",
    "example_sentence": "The silhouette of the old oak tree stood dramatically against the fiery orange sunset.",
    "synonyms": [
      "outline",
      "profile",
      "contour",
      "shadow"
    ],
    "antonyms": [
      "detail",
      "surface",
      "interior",
      "features"
    ],
    "pronunciation": "/ˌsɪl.uˈet/",
    "phonetic": "sil-oo-ET",
    "difficulty": "medium",
    "usage_context": "Photography, graphic design, art, and romantic nocturnal descriptions.",
    "memory_tip": "Named after Étienne de Silhouette, an 18th-century French finance minister who made inexpensive shadow portraits.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000007-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Bruises",
    "normalized_word": "bruises",
    "simple_meaning": "Dark marks on the skin caused by blood leaking from damaged capillaries",
    "detailed_meaning": "Areas of skin discoloration caused by blunt impact breaking small blood vessels without breaking the skin surface (contusions).",
    "part_of_speech": "noun",
    "example_sentence": "He wore shin guards during rugby practice to prevent painful bruises.",
    "synonyms": [
      "contusions",
      "welts",
      "black-and-blues",
      "blemishes"
    ],
    "antonyms": [
      "clear skin",
      "unmarked flesh"
    ],
    "pronunciation": "/ˈbruː.zɪz/",
    "phonetic": "BROOZ-iz",
    "difficulty": "easy",
    "usage_context": "Medical, athletic, and physical recovery contexts.",
    "memory_tip": "Blue-ish bruises appear after you lose your balance.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000008-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Resuscitate",
    "normalized_word": "resuscitate",
    "simple_meaning": "To revive someone from unconsciousness, near-death, or inactivity",
    "detailed_meaning": "To restore to consciousness, vigor, or life after apparent death or deep unconsciousness; figuratively, to revitalize stagnant projects.",
    "part_of_speech": "verb",
    "example_sentence": "Paramedics performed CPR for ten minutes to resuscitate the drowning victim.",
    "synonyms": [
      "revive",
      "reanimate",
      "resurrect",
      "revitalize"
    ],
    "antonyms": [
      "kill",
      "extinguish",
      "terminate",
      "smother"
    ],
    "pronunciation": "/rɪˈsʌs.ɪ.teɪt/",
    "phonetic": "rih-SUS-ih-tayt",
    "difficulty": "hard",
    "usage_context": "Emergency medicine, first-aid training, and corporate turnaround discussions.",
    "memory_tip": "Re-sus-citate: bringing someone back to a sustainable state of breath.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000009-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Frantic",
    "normalized_word": "frantic",
    "simple_meaning": "Wild with fear, anxiety, or uncontrolled activity",
    "detailed_meaning": "Distraught with overwhelming worry, panic, or urgent haste; conducted in a disordered, chaotic manner.",
    "part_of_speech": "adjective",
    "example_sentence": "There was a frantic search through the airport when she realized she misplaced her passport.",
    "synonyms": [
      "panicked",
      "frenzied",
      "hectic",
      "distraught"
    ],
    "antonyms": [
      "calm",
      "serene",
      "composed",
      "placid"
    ],
    "pronunciation": "/ˈfræn.tɪk/",
    "phonetic": "FRAN-tik",
    "difficulty": "easy",
    "usage_context": "High-stress emergencies, deadline crunches, and sudden chaos.",
    "memory_tip": "Sounds like \"frenetic\" — fast and full of panic.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000010-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Fortuitous",
    "normalized_word": "fortuitous",
    "simple_meaning": "Happening by a lucky chance rather than by intention",
    "detailed_meaning": "Occurring unexpectedly by accident or good fortune, resulting in an advantageous outcome.",
    "part_of_speech": "adjective",
    "example_sentence": "Their fortuitous meeting at the technology conference led to a million-dollar partnership.",
    "synonyms": [
      "accidental",
      "lucky",
      "providential",
      "serendipitous"
    ],
    "antonyms": [
      "premeditated",
      "deliberate",
      "intentional",
      "unfortunate"
    ],
    "pronunciation": "/fɔːˈtʃuː.ɪ.təs/",
    "phonetic": "for-CHOO-ih-tus",
    "difficulty": "hard",
    "usage_context": "Formal writing, narrative discoveries, and professional success stories.",
    "memory_tip": "Fortuitous shares the root of \"fortune\" — good luck happening by chance.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000011-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Insistent",
    "normalized_word": "insistent",
    "simple_meaning": "Demanding something forcefully and refusing to give up",
    "detailed_meaning": "Persisting firmly in a demand, claim, or course of action; refusing to take no for an answer.",
    "part_of_speech": "adjective",
    "example_sentence": "Despite the snowstorm, the manager was insistent that the delivery arrive before noon.",
    "synonyms": [
      "persistent",
      "dogged",
      "unyielding",
      "emphatic"
    ],
    "antonyms": [
      "flexible",
      "hesitant",
      "passive",
      "compliant"
    ],
    "pronunciation": "/ɪnˈsɪs.tənt/",
    "phonetic": "in-SIS-tuhnt",
    "difficulty": "medium",
    "usage_context": "Negotiations, persuasive debates, and recurring sounds or demands.",
    "memory_tip": "In-sistent: someone who will stand inside and not leave until they get what they want.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000012-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Vengeance",
    "normalized_word": "vengeance",
    "simple_meaning": "Punishment or retaliation inflicted in return for an injury or wrongdoing",
    "detailed_meaning": "The act of inflicting harm, retributive punishment, or retribution on an adversary who caused grievance or injustice.",
    "part_of_speech": "noun",
    "example_sentence": "The epic poem tells of a warrior who swore vengeance against the clan that destroyed his homeland.",
    "synonyms": [
      "revenge",
      "retribution",
      "payback",
      "reprisal"
    ],
    "antonyms": [
      "forgiveness",
      "mercy",
      "pardon",
      "clemency"
    ],
    "pronunciation": "/ˈven.dʒəns/",
    "phonetic": "VEN-juhns",
    "difficulty": "medium",
    "usage_context": "Action movies, epic tragedies, legal debates on retributive justice.",
    "memory_tip": "Vengeance is seeking re-venge with passion.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000013-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Clamour",
    "normalized_word": "clamour",
    "simple_meaning": "A loud and confused noise, especially of people shouting",
    "detailed_meaning": "A vehement expression of collective shouting, loud outcry, or an urgent public demand for immediate action.",
    "part_of_speech": "noun",
    "example_sentence": "The clamour of protesters outside the embassy could be heard from blocks away.",
    "synonyms": [
      "uproar",
      "tumult",
      "din",
      "racket"
    ],
    "antonyms": [
      "silence",
      "tranquility",
      "quiet",
      "hush"
    ],
    "pronunciation": "/ˈklæm.ər/",
    "phonetic": "KLAM-er",
    "difficulty": "medium",
    "usage_context": "Political rallies, bustling trading floors, and passionate crowds.",
    "memory_tip": "Clamour sounds like \"slammer\" — loud noise that bangs like slamming doors.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000014-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Juvenile",
    "normalized_word": "juvenile",
    "simple_meaning": "Relating to young people; immature or childish",
    "detailed_meaning": "Characteristic of or suited to youth; or exhibiting immature, childish behavior inappropriate for an adult.",
    "part_of_speech": "adjective",
    "example_sentence": "His juvenile jokes during the executive presentation embarrassed the entire division.",
    "synonyms": [
      "youthful",
      "childish",
      "immature",
      "adolescent"
    ],
    "antonyms": [
      "mature",
      "adult",
      "sophisticated",
      "seasoned"
    ],
    "pronunciation": "/ˈdʒuː.vən.aɪl/",
    "phonetic": "JOO-vuh-nyl",
    "difficulty": "easy",
    "usage_context": "Legal terms (juvenile court), psychology, and behavioral criticism.",
    "memory_tip": "Related to \"rejuvenate\" (make young again); juvenile means young or acting young.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000015-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Psoriasis",
    "normalized_word": "psoriasis",
    "simple_meaning": "A chronic skin disease marked by red, itchy, scaly patches",
    "detailed_meaning": "An autoimmune condition characterized by hyperproliferation of skin cells, causing silver-scaled, inflamed plaques.",
    "part_of_speech": "noun",
    "example_sentence": "The dermatologist recommended topical ointments and UV phototherapy to soothe his psoriasis flares.",
    "synonyms": [
      "skin disorder",
      "dermatosis",
      "plaque psoriasis"
    ],
    "antonyms": [
      "clear skin"
    ],
    "pronunciation": "/səˈraɪ.ə.sɪs/",
    "phonetic": "suh-RY-uh-sis",
    "difficulty": "hard",
    "usage_context": "Dermatology, medical consultations, and chronic healthcare discussions.",
    "memory_tip": "Silent P at the beginning: think of \"sore eyes is\" — sore patches on the skin.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000016-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Melancholy",
    "normalized_word": "melancholy",
    "simple_meaning": "A deep, pensive, and long-lasting sadness",
    "detailed_meaning": "A gloomy state of mind, typically with no obvious cause; a tender, contemplative sadness often celebrated in poetry and art.",
    "part_of_speech": "noun",
    "example_sentence": "A gentle melancholy settled over him whenever he listened to Chopin nocturnes in autumn.",
    "synonyms": [
      "sorrow",
      "despondency",
      "wistfulness",
      "woe"
    ],
    "antonyms": [
      "exuberance",
      "cheerfulness",
      "ecstasy",
      "mirth"
    ],
    "pronunciation": "/ˈmel.əŋ.kɒl.i/",
    "phonetic": "MEL-un-kol-ee",
    "difficulty": "medium",
    "usage_context": "Classic literature, music reviews, and emotional memoirs.",
    "memory_tip": "Ancient Greek \"melas\" (black) + \"chole\" (bile) — the historic belief that dark melancholy was black bile.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000017-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Triumphant",
    "normalized_word": "triumphant",
    "simple_meaning": "Having won a battle, contest, or goal; feeling celebratory joy",
    "detailed_meaning": "Victorious, conqueror-like; rejoicing in great success, mastery, or achievement over strong opposition.",
    "part_of_speech": "adjective",
    "example_sentence": "The triumphant athlete raised the gold trophy to the roaring stadium crowd.",
    "synonyms": [
      "victorious",
      "exultant",
      "successful",
      "jubilant"
    ],
    "antonyms": [
      "defeated",
      "crestfallen",
      "subdued",
      "vanquished"
    ],
    "pronunciation": "/traɪˈʌm.fənt/",
    "phonetic": "try-UM-fuhnt",
    "difficulty": "easy",
    "usage_context": "Athletics, military achievements, political victories, and milestone celebrations.",
    "memory_tip": "Triumph + ant: a marching army of winners celebrating victory.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000018-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Begrudgingly",
    "normalized_word": "begrudgingly",
    "simple_meaning": "Reluctantly or with hidden resentment",
    "detailed_meaning": "In a manner that shows unwillingness, reluctance, or envy when granting, giving, or acknowledging something.",
    "part_of_speech": "adverb",
    "example_sentence": "He begrudgingly admitted that his rival had given a far superior presentation.",
    "synonyms": [
      "reluctantly",
      "grudgingly",
      "unwillingly",
      "resentfully"
    ],
    "antonyms": [
      "eagerly",
      "willingly",
      "gladly",
      "cheerfully"
    ],
    "pronunciation": "/bɪˈɡrʌdʒ.ɪŋ.li/",
    "phonetic": "bih-GRUJ-ing-lee",
    "difficulty": "medium",
    "usage_context": "Admitting mistakes, giving credit to competitors, or completing unpleasant obligations.",
    "memory_tip": "Holding a \"grudge\" while doing something you do not want to do.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000019-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Contort",
    "normalized_word": "contort",
    "simple_meaning": "To twist or bend out of its normal shape",
    "detailed_meaning": "To twist, warp, or strain something forcefully so that its natural form, posture, or meaning is distorted.",
    "part_of_speech": "verb",
    "example_sentence": "Her face contorted in agony when she twisted her ankle on the uneven gravel.",
    "synonyms": [
      "twist",
      "warp",
      "distort",
      "deform"
    ],
    "antonyms": [
      "straighten",
      "align",
      "flatten",
      "smooth"
    ],
    "pronunciation": "/kənˈtɔːt/",
    "phonetic": "kuhn-TORT",
    "difficulty": "medium",
    "usage_context": "Acrobatics, facial expressions in intense pain, and twisted rhetorical arguments.",
    "memory_tip": "Like a \"contortionist\" bending into impossible geometric shapes.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000020-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Sullen",
    "normalized_word": "sullen",
    "simple_meaning": "Bad-tempered, gloomy, and sulky",
    "detailed_meaning": "Silently showing resentment, irritation, or ill humor; grimly gloomy and unresponsive to friendly interaction.",
    "part_of_speech": "adjective",
    "example_sentence": "The teenager gave sullen one-word answers throughout the family dinner.",
    "synonyms": [
      "morose",
      "sulky",
      "sour",
      "glum"
    ],
    "antonyms": [
      "cheerful",
      "genial",
      "outgoing",
      "amiable"
    ],
    "pronunciation": "/ˈsʌl.ən/",
    "phonetic": "SUL-uhn",
    "difficulty": "easy",
    "usage_context": "Interpersonal disputes, moody characters in novels, and heavy overcast weather.",
    "memory_tip": "Sullen sounds like \"sulking alone in a corner\".",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000021-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Comrade",
    "normalized_word": "comrade",
    "simple_meaning": "A close companion, fellow member, or ally in struggle",
    "detailed_meaning": "A companion who shares one’s activities or is a fellow member of an organization, military unit, or political party.",
    "part_of_speech": "noun",
    "example_sentence": "After years serving in the rescue squad, the firefighters considered one another trusted comrades.",
    "synonyms": [
      "companion",
      "partner",
      "ally",
      "associate"
    ],
    "antonyms": [
      "enemy",
      "foe",
      "adversary",
      "rival"
    ],
    "pronunciation": "/ˈkɒm.reɪd/",
    "phonetic": "KOM-rayd",
    "difficulty": "easy",
    "usage_context": "Military fraternities, labor unions, historical movements, and deep brotherhoods.",
    "memory_tip": "Spanish \"camarada\" (roommate) — someone sharing quarters and battles with you.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000022-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Marred",
    "normalized_word": "marred",
    "simple_meaning": "Damaged, spoiled, or impaired in appearance or perfection",
    "detailed_meaning": "Impaired the quality, condition, or appearance of; scarred or blemished by defects or unfortunate occurrences.",
    "part_of_speech": "adjective",
    "example_sentence": "The wedding celebration was marred by a sudden electrical outage during the speeches.",
    "synonyms": [
      "spoiled",
      "blemished",
      "flawed",
      "tarnished"
    ],
    "antonyms": [
      "pristine",
      "unblemished",
      "flawless",
      "perfect"
    ],
    "pronunciation": "/mɑːd/",
    "phonetic": "MAHRD",
    "difficulty": "medium",
    "usage_context": "Art critiques, aesthetic reviews, and recounting events spoiled by a blunder.",
    "memory_tip": "Marred sounds like \"scarred\" — a scar that ruins a pristine surface.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000023-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Cacophony",
    "normalized_word": "cacophony",
    "simple_meaning": "A harsh, jarring mixture of unpleasant sounds",
    "detailed_meaning": "A discordant, loud, and jarring mixture of sounds or voices that clash painfully to the ear.",
    "part_of_speech": "noun",
    "example_sentence": "A cacophony of car horns, construction drills, and shouting vendors greeted them outside the terminal.",
    "synonyms": [
      "discord",
      "dissonance",
      "racket",
      "clamor"
    ],
    "antonyms": [
      "harmony",
      "euphony",
      "melody",
      "symphony"
    ],
    "pronunciation": "/kəˈkɒf.ə.ni/",
    "phonetic": "kuh-KOF-uh-nee",
    "difficulty": "medium",
    "usage_context": "Urban noise, chaotic orchestras, or overlapping arguments.",
    "memory_tip": "Greek \"kakos\" (bad) + \"phone\" (sound) = bad sound.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000024-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Sordid",
    "normalized_word": "sordid",
    "simple_meaning": "Involving dishonorable actions and motives; dirty and squalid",
    "detailed_meaning": "Morally degraded, corrupt, and ignoble; or physically foul, wretched, and run-down.",
    "part_of_speech": "adjective",
    "example_sentence": "Investigative journalists uncovered the sordid details of the bribery scheme.",
    "synonyms": [
      "ignoble",
      "squalid",
      "sleazy",
      "shameful"
    ],
    "antonyms": [
      "honorable",
      "pure",
      "noble",
      "immaculate"
    ],
    "pronunciation": "/ˈsɔː.dɪd/",
    "phonetic": "SOR-did",
    "difficulty": "medium",
    "usage_context": "Political scandals, crime noir novels, and urban poverty critiques.",
    "memory_tip": "Sounds like \"soiled\" — morally and physically dirty.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000025-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Shriek",
    "normalized_word": "shriek",
    "simple_meaning": "To make a high-pitched, piercing cry or sound",
    "detailed_meaning": "To utter a sharp, shrill, high-pitched scream resulting from fear, excitement, horror, or pain.",
    "part_of_speech": "verb",
    "example_sentence": "She shrieked in terror as the rollercoaster plunged down the vertical drop.",
    "synonyms": [
      "screech",
      "scream",
      "squawk",
      "howl"
    ],
    "antonyms": [
      "whisper",
      "murmur",
      "mutter",
      "hush"
    ],
    "pronunciation": "/ʃriːk/",
    "phonetic": "SHREEK",
    "difficulty": "easy",
    "usage_context": "Suspense fiction, spooky encounters, rollercoasters, and sudden shocks.",
    "memory_tip": "Sounds like Shrek shouting in a high pitch when scared.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000026-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Knackered",
    "normalized_word": "knackered",
    "simple_meaning": "Extremely tired, exhausted, or worn out",
    "detailed_meaning": "British informal term describing severe physical exhaustion or equipment that is broken and beyond repair.",
    "part_of_speech": "adjective",
    "example_sentence": "After painting the two-story house in the scorching heat, I was absolutely knackered.",
    "synonyms": [
      "exhausted",
      "drained",
      "shattered",
      "fatigued"
    ],
    "antonyms": [
      "invigorated",
      "energized",
      "refreshed",
      "rested"
    ],
    "pronunciation": "/ˈnæk.əd/",
    "phonetic": "NAK-erd",
    "difficulty": "medium",
    "usage_context": "British, Irish, and Australian informal speech after long shifts or workouts.",
    "memory_tip": "Historically from the knacker who bought old, worn-out workhorses.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000027-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Lug",
    "normalized_word": "lug",
    "simple_meaning": "To carry or drag something heavy with great effort",
    "detailed_meaning": "To pull, drag, or haul a heavy or cumbersome object with considerable strain.",
    "part_of_speech": "verb",
    "example_sentence": "We had to lug five oversized suitcases up four flights of spiral stairs.",
    "synonyms": [
      "haul",
      "tote",
      "drag",
      "hoist"
    ],
    "antonyms": [
      "drop",
      "push lightly",
      "glide"
    ],
    "pronunciation": "/lʌɡ/",
    "phonetic": "LUG",
    "difficulty": "easy",
    "usage_context": "Moving furniture, airport luggage, and physical labor.",
    "memory_tip": "Lug is the root of \"luggage\" — the heavy bags you have to lug around.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000028-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Scrawny",
    "normalized_word": "scrawny",
    "simple_meaning": "Unattractively thin, skinny, and bony",
    "detailed_meaning": "Being lean, haggard, and lacking healthy muscle or fat; looking fragile and undernourished.",
    "part_of_speech": "adjective",
    "example_sentence": "The scrawny stray kitten purred eagerly when offered a bowl of warm milk.",
    "synonyms": [
      "skinny",
      "bony",
      "gaunt",
      "skeletal"
    ],
    "antonyms": [
      "muscular",
      "stout",
      "plump",
      "robust"
    ],
    "pronunciation": "/ˈskrɔː.ni/",
    "phonetic": "SKRAW-nee",
    "difficulty": "easy",
    "usage_context": "Describing emaciated animals, lanky teenagers, or weathered limbs.",
    "memory_tip": "Scrawny things look like raw dry twigs scratching in the wind.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000029-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Grotesques",
    "normalized_word": "grotesques",
    "simple_meaning": "Comically or repulsively distorted figures or art forms",
    "detailed_meaning": "Characters, sculptures, or gargoyle-like motifs characterized by fantastic, absurd, or bizarre distortions of natural forms.",
    "part_of_speech": "noun",
    "example_sentence": "Stone grotesques glared down from the cathedral roof, warding off ancient spirits.",
    "synonyms": [
      "caricatures",
      "monstrosities",
      "oddities",
      "fantasies"
    ],
    "antonyms": [
      "beauties",
      "classical forms",
      "perfections"
    ],
    "pronunciation": "/ɡroʊˈtesks/",
    "phonetic": "groh-TESKS",
    "difficulty": "medium",
    "usage_context": "Gothic architecture, art history, literature exploring uncanny distortions.",
    "memory_tip": "Originated from Italian \"grottesco\" (paintings found in the Roman caves/grottoes).",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000030-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Retort",
    "normalized_word": "retort",
    "simple_meaning": "A sharp, witty, or angry quick reply",
    "detailed_meaning": "A swift, incisive counter-argument or biting comeback delivered in response to an insult or question.",
    "part_of_speech": "noun",
    "example_sentence": "When asked why he was late, he snapped back with an acerbic retort.",
    "synonyms": [
      "comeback",
      "riposte",
      "rejoinder",
      "counter"
    ],
    "antonyms": [
      "question",
      "concession",
      "admission"
    ],
    "pronunciation": "/rɪˈtɔːt/",
    "phonetic": "rih-TORT",
    "difficulty": "medium",
    "usage_context": "Debates, courtroom dramas, and witty repartee between characters.",
    "memory_tip": "Re- (back) + tort (twist): twisting the comment right back at the speaker.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000031-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Houndstooth",
    "normalized_word": "houndstooth",
    "simple_meaning": "A duotone textile pattern of broken or jagged checks",
    "detailed_meaning": "A classic geometric two-tone textile pattern characterized by broken checks or four-pointed abstract shapes resembling canine teeth.",
    "part_of_speech": "noun",
    "example_sentence": "The professor wore a distinguished houndstooth blazer to the symposium.",
    "synonyms": [
      "dogtooth pattern",
      "shepherd check",
      "puppytooth"
    ],
    "antonyms": [
      "plain fabric",
      "solid color"
    ],
    "pronunciation": "/ˈhaʊndz.tuːθ/",
    "phonetic": "HOWNDZ-tooth",
    "difficulty": "medium",
    "usage_context": "Fashion design, vintage tailoring, and luxury woolen coats.",
    "memory_tip": "The jagged checks literally resemble the sharp teeth of a hound dog.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000032-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Kerb",
    "normalized_word": "kerb",
    "simple_meaning": "The stone edge separating a street from the sidewalk",
    "detailed_meaning": "The raised stone or concrete border lining the side of a roadway, delineating pavement from pavement or pedestrian footway (British spelling of curb).",
    "part_of_speech": "noun",
    "example_sentence": "She stepped down off the kerb into the taxi as the driver opened the door.",
    "synonyms": [
      "curb",
      "edge",
      "border",
      "verge"
    ],
    "antonyms": [
      "roadbed",
      "center lane"
    ],
    "pronunciation": "/kɜːb/",
    "phonetic": "KERB",
    "difficulty": "easy",
    "usage_context": "British and Commonwealth English for streetscapes, parking, and urban walking.",
    "memory_tip": "Kerb with a K is the British road edge; curb with a C is used both for restraining impulses and the American street curb.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000033-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Splay",
    "normalized_word": "splay",
    "simple_meaning": "To spread out wide or turn outward clumsily",
    "detailed_meaning": "To thrust out, spread apart, or expand outward at an awkward angle; to display widely.",
    "part_of_speech": "verb",
    "example_sentence": "The frightened cat splayed its paws across the vet examination table.",
    "synonyms": [
      "spread",
      "flare",
      "fan out",
      "disperse"
    ],
    "antonyms": [
      "tuck",
      "constrict",
      "gather",
      "fold"
    ],
    "pronunciation": "/spleɪ/",
    "phonetic": "SPLAY",
    "difficulty": "medium",
    "usage_context": "Body mechanics, architecture (splayed windows), and animal defense postures.",
    "memory_tip": "Splay sounds like \"spread and play\" out flat.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000034-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Ridicule",
    "normalized_word": "ridicule",
    "simple_meaning": "Mockery or derision aimed at making someone look ridiculous",
    "detailed_meaning": "Subjection of someone or something to contemptuous and dismissive laughter, teasing, or scornful caricature.",
    "part_of_speech": "noun",
    "example_sentence": "His unconventional theories initially faced harsh ridicule from orthodox astronomers.",
    "synonyms": [
      "derision",
      "mockery",
      "scorn",
      "taunting"
    ],
    "antonyms": [
      "praise",
      "admiration",
      "respect",
      "esteem"
    ],
    "pronunciation": "/ˈrɪd.ɪ.kjuːl/",
    "phonetic": "RID-ih-kyool",
    "difficulty": "easy",
    "usage_context": "Social criticism, satire, and bullying dynamics.",
    "memory_tip": "Related to \"ridiculous\" — treating something as purely ridiculous.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000035-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Usurper",
    "normalized_word": "usurper",
    "simple_meaning": "A person who takes power, office, or property unlawfully",
    "detailed_meaning": "One who wrongfully seizes and holds a position of authority, royal power, or land without legal right or legitimate claim.",
    "part_of_speech": "noun",
    "example_sentence": "The young prince rallied the northern barons to march against the usurper who sat on his father’s throne.",
    "synonyms": [
      "seizer",
      "pretender",
      "tyrant",
      "interloper"
    ],
    "antonyms": [
      "rightful heir",
      "legitimate monarch",
      "lawful successor"
    ],
    "pronunciation": "/juːˈzɜː.pər/",
    "phonetic": "yoo-ZER-per",
    "difficulty": "hard",
    "usage_context": "Historical chronicles, medieval fantasy sagas, and political coups.",
    "memory_tip": "Usurp + er = one who uses unearned force to steal a throne.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000036-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Cajole",
    "normalized_word": "cajole",
    "simple_meaning": "To persuade someone to do something through gentle flattery or soothing words",
    "detailed_meaning": "To coax or entice someone toward an action or decision through persistent sweet talk, charm, or soothing entreaties.",
    "part_of_speech": "verb",
    "example_sentence": "She managed to cajole her father into letting her borrow the sports car for prom night.",
    "synonyms": [
      "coax",
      "wheedle",
      "sweet-talk",
      "entice"
    ],
    "antonyms": [
      "bully",
      "coerce",
      "intimidate",
      "force"
    ],
    "pronunciation": "/kəˈdʒoʊl/",
    "phonetic": "kuh-JOHL",
    "difficulty": "hard",
    "usage_context": "Interpersonal diplomacy, parenting tactics, and persuasive sales negotiation.",
    "memory_tip": "Cajole like feeding \"cajun jelly\" — smooth, sweet, and irresistible.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000037-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Masquerading",
    "normalized_word": "masquerading",
    "simple_meaning": "Pretending to be someone or something one is not",
    "detailed_meaning": "Assuming a false identity, appearance, or outward guise to deceive or conceal true nature; participating in a masquerade.",
    "part_of_speech": "verb",
    "example_sentence": "The malware was masquerading as a legitimate system antivirus update.",
    "synonyms": [
      "impersonating",
      "disguising",
      "posing",
      "feigning"
    ],
    "antonyms": [
      "revealing",
      "unmasking",
      "confessing"
    ],
    "pronunciation": "/ˌmæs.kəˈreɪd.ɪŋ/",
    "phonetic": "mas-kuh-RAYD-ing",
    "difficulty": "medium",
    "usage_context": "Cybersecurity attacks, spy fiction, and social imposters.",
    "memory_tip": "Mask + parade: wearing a mask in the public parade to hide identity.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000038-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Formidable",
    "normalized_word": "formidable",
    "simple_meaning": "Inspiring fear, admiration, or respect through being impressively large or capable",
    "detailed_meaning": "Exciting awe, dread, or great admiration by reason of extraordinary size, power, intellect, or difficulty.",
    "part_of_speech": "adjective",
    "example_sentence": "The chess grandmaster was a formidable opponent who had not lost a tournament in five years.",
    "synonyms": [
      "daunting",
      "intimidating",
      "imposing",
      "fearsome"
    ],
    "antonyms": [
      "feeble",
      "insignificant",
      "harmless",
      "weak"
    ],
    "pronunciation": "/ˈfɔː.mɪ.də.bəl/",
    "phonetic": "FOR-mih-duh-buhl",
    "difficulty": "medium",
    "usage_context": "High-stakes competition, complex challenges, and commanding leaders.",
    "memory_tip": "From Latin \"formido\" (terror) — possessing great ability that frightens rivals.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000039-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Whimpering",
    "normalized_word": "whimpering",
    "simple_meaning": "Making low, feeble sounds expressive of fear, pain, or discontent",
    "detailed_meaning": "Uttering a series of low, weak, broken cries or plaintive sounds characteristic of helplessness, sorrow, or physical discomfort.",
    "part_of_speech": "verb",
    "example_sentence": "The frightened puppy sat in the corner whimpering during the loud thunderstorm.",
    "synonyms": [
      "sniveling",
      "whining",
      "sobbing",
      "crying"
    ],
    "antonyms": [
      "roaring",
      "bellowing",
      "laughing",
      "shouting"
    ],
    "pronunciation": "/ˈwɪm.pər.ɪŋ/",
    "phonetic": "WIM-per-ing",
    "difficulty": "easy",
    "usage_context": "Children, injured animals, and characters expressing quiet terror.",
    "memory_tip": "A \"wimp\" whimpers when facing minor distress.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000040-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Guffaw",
    "normalized_word": "guffaw",
    "simple_meaning": "A loud, hearty, and boisterous burst of laughter",
    "detailed_meaning": "A sudden, noisy, unrestrained laugh that erupts from deep within, often causing the laugher to lean back or slap a knee.",
    "part_of_speech": "noun",
    "example_sentence": "His witty quip provoked an unexpected guffaw from the stern judge.",
    "synonyms": [
      "bellow",
      "chuckle",
      "roar",
      "belly laugh"
    ],
    "antonyms": [
      "whimper",
      "frown",
      "snicker",
      "silence"
    ],
    "pronunciation": "/ɡəˈfɔː/",
    "phonetic": "guh-FAW",
    "difficulty": "medium",
    "usage_context": "Comedy clubs, friendly tavern banter, and jovial family gatherings.",
    "memory_tip": "Onomatopoeic: say \"GUH-FAW!\" and it sounds like a sudden belly laugh.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000041-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Trudge",
    "normalized_word": "trudge",
    "simple_meaning": "To walk slowly and with heavy steps, typically from exhaustion or harsh terrain",
    "detailed_meaning": "To march or walk laboriously, dragging feet under fatigue, burdens, or deep snow and mud.",
    "part_of_speech": "verb",
    "example_sentence": "The weary mountaineers trudged through knee-deep snow toward the alpine hut.",
    "synonyms": [
      "plod",
      "trek",
      "slog",
      "lumber"
    ],
    "antonyms": [
      "stride",
      "glide",
      "scamper",
      "skip"
    ],
    "pronunciation": "/trʌdʒ/",
    "phonetic": "TRUDJ",
    "difficulty": "easy",
    "usage_context": "Extreme weather journeys, military marches, and walking home after exhausting shifts.",
    "memory_tip": "Sounds like \"mud + sludge\" — walking through deep sludge.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000042-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Pram",
    "normalized_word": "pram",
    "simple_meaning": "A four-wheeled carriage for a baby pushed by a person walking",
    "detailed_meaning": "A four-wheeled conveyance with a flat bottom for an infant to lie down while being wheeled (British English, short for perambulator).",
    "part_of_speech": "noun",
    "example_sentence": "He pushed the baby pram along the park footpath while listening to an audiobook.",
    "synonyms": [
      "baby carriage",
      "stroller",
      "perambulator",
      "buggy"
    ],
    "antonyms": [],
    "pronunciation": "/præm/",
    "phonetic": "PRAM",
    "difficulty": "easy",
    "usage_context": "British parenting, park walks, and family life.",
    "memory_tip": "PRAM comes from perambulate (to walk around).",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000043-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Promenade",
    "normalized_word": "promenade",
    "simple_meaning": "A paved public walk, typically along a waterfront",
    "detailed_meaning": "A leisurely stroll in public to see and be seen; or an expansive paved walkway, especially along an ocean or lakeside.",
    "part_of_speech": "noun",
    "example_sentence": "Couples enjoyed a sunset promenade along the coastal boulevard overlooking the Mediterranean.",
    "synonyms": [
      "walkway",
      "esplanade",
      "stroll",
      "boardwalk"
    ],
    "antonyms": [],
    "pronunciation": "/ˌprɒm.əˈnɑːd/",
    "phonetic": "prom-uh-NAHD",
    "difficulty": "medium",
    "usage_context": "Coastal tourism, 19th-century high-society walks, and architecture.",
    "memory_tip": "Related to \"prom\" (the grand formal high-school promenade dance).",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000044-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Cataclysm",
    "normalized_word": "cataclysm",
    "simple_meaning": "A large-scale and violent event in the natural world or society",
    "detailed_meaning": "A momentous and violent upheaval, disaster, or sudden catastrophe that alters the political, geographical, or physical landscape.",
    "part_of_speech": "noun",
    "example_sentence": "The asteroid impact triggered an ecological cataclysm that ended the reign of the dinosaurs.",
    "synonyms": [
      "catastrophe",
      "disaster",
      "calamity",
      "upheaval"
    ],
    "antonyms": [
      "blessing",
      "salvation",
      "miracle",
      "restoration"
    ],
    "pronunciation": "/ˈkæt.ə.klɪz.əm/",
    "phonetic": "KAT-uh-kliz-um",
    "difficulty": "hard",
    "usage_context": "Geology, environmental crises, and catastrophic historical collapses.",
    "memory_tip": "Greek \"kataklysmos\" (deluge / flood) — a deluge so huge it breaks everything.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000045-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Leper",
    "normalized_word": "leper",
    "simple_meaning": "A person afflicted with leprosy; figuratively, an outcast shunned by society",
    "detailed_meaning": "A person with Hansen’s disease; historically and figuratively, someone rejected, ostracized, or shunned with revulsion.",
    "part_of_speech": "noun",
    "example_sentence": "After blowing the whistle on his firm’s illegal dumping, he was treated like a social leper by former colleagues.",
    "synonyms": [
      "outcast",
      "pariah",
      "untouchable",
      "exile"
    ],
    "antonyms": [
      "darling",
      "insider",
      "favorite",
      "celebrity"
    ],
    "pronunciation": "/ˈlep.ər/",
    "phonetic": "LEP-er",
    "difficulty": "medium",
    "usage_context": "Historical medical studies, biblical literature, and social exile metaphors.",
    "memory_tip": "Leper = pariah left outside the colony.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000046-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Satchel",
    "normalized_word": "satchel",
    "simple_meaning": "A bag with a shoulder strap used for carrying books and personal items",
    "detailed_meaning": "A small leather or canvas bag carried over the shoulder or across the torso, traditionally used by scholars and messengers.",
    "part_of_speech": "noun",
    "example_sentence": "The archaeologist tucked his leather-bound journal safely into his canvas satchel.",
    "synonyms": [
      "shoulder bag",
      "haversack",
      "messenger bag",
      "tote"
    ],
    "antonyms": [],
    "pronunciation": "/ˈsætʃ.əl/",
    "phonetic": "SATCH-uhl",
    "difficulty": "easy",
    "usage_context": "Vintage academia, messenger gear, and classic school stories.",
    "memory_tip": "Think of a sack strapped across your chest: sack + latch = satchel.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000047-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Horace",
    "normalized_word": "horace",
    "simple_meaning": "Renowned ancient Roman lyric poet; symbol of classical wit and \"carpe diem\"",
    "detailed_meaning": "Quintus Horatius Flaccus (65–8 BC), foremost Roman lyric poet during the age of Augustus, famed for his Odes, Satires, and coining \"carpe diem\".",
    "part_of_speech": "noun",
    "example_sentence": "In literary analysis class, we studied Horace’s poetic philosophy on moderation and seizing the present day.",
    "synonyms": [
      "Roman poet",
      "Horatian satirist",
      "lyric master"
    ],
    "antonyms": [],
    "pronunciation": "/ˈhɒr.ɪs/",
    "phonetic": "HOR-is",
    "difficulty": "hard",
    "usage_context": "Classical literature, poetic philosophy, and academic humanities discussions.",
    "memory_tip": "Horace coined \"carpe diem\" — seize the hour (hora).",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000048-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Nymphs",
    "normalized_word": "nymphs",
    "simple_meaning": "Mythological nature spirits; or immature stages of insects",
    "detailed_meaning": "Minor female deities in Greco-Roman mythology animating rivers, trees, and mountains; in biology, juvenile forms of insects before metamorphosis.",
    "part_of_speech": "noun",
    "example_sentence": "Ancient legends claimed sacred woodland nymphs guarded the pristine spring.",
    "synonyms": [
      "sprites",
      "dryads",
      "naiads",
      "nature spirits"
    ],
    "antonyms": [],
    "pronunciation": "/nɪmfs/",
    "phonetic": "NIMFS",
    "difficulty": "medium",
    "usage_context": "Classical mythology, fantasy lore, and entomology (dragonfly nymphs).",
    "memory_tip": "Nymphs dance near nature springs.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000049-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Pagan",
    "normalized_word": "pagan",
    "simple_meaning": "A follower of polytheistic or nature-based spiritual traditions",
    "detailed_meaning": "A person holding religious beliefs other than those of the main world monotheistic religions, historically centered on polytheism or veneration of nature.",
    "part_of_speech": "noun",
    "example_sentence": "Stonehenge continues to draw modern pagans who gather to celebrate the summer solstice.",
    "synonyms": [
      "polytheist",
      "pantheist",
      "heathen",
      "nature worshipper"
    ],
    "antonyms": [
      "monotheist",
      "orthodox believer"
    ],
    "pronunciation": "/ˈpeɪ.ɡən/",
    "phonetic": "PAY-guhn",
    "difficulty": "medium",
    "usage_context": "Anthropology, ancient European history, and seasonal solstice celebrations.",
    "memory_tip": "From Latin \"paganus\" (country dweller) who kept ancient nature rites.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000050-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Pallid",
    "normalized_word": "pallid",
    "simple_meaning": "Pale, typically because of poor health or shock",
    "detailed_meaning": "Deficient in color, unnaturally wan or bloodless; lacking vigor, intensity, or sparkle.",
    "part_of_speech": "adjective",
    "example_sentence": "After days confined in the sickbay, the sailor emerged looking frail and pallid.",
    "synonyms": [
      "pale",
      "wan",
      "ashen",
      "pasty"
    ],
    "antonyms": [
      "ruddy",
      "flushed",
      "glowing",
      "radiant"
    ],
    "pronunciation": "/ˈpæl.ɪd/",
    "phonetic": "PAL-id",
    "difficulty": "medium",
    "usage_context": "Medical condition descriptions, Victorian gothic horror, and literary character portraits.",
    "memory_tip": "Pallid shares root with \"pale\" — so pale it looks white like plaster.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000051-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Immaculate",
    "normalized_word": "immaculate",
    "simple_meaning": "Perfectly clean, neat, or pure; free from flaws",
    "detailed_meaning": "Spotlessly clean, tidy, and without a single blemish; also used morally to describe untainted integrity or perfect execution.",
    "part_of_speech": "adjective",
    "example_sentence": "The chef maintained an immaculate stainless steel kitchen where not a crumb was out of place.",
    "synonyms": [
      "pristine",
      "spotless",
      "flawless",
      "unsullied"
    ],
    "antonyms": [
      "filthy",
      "squalid",
      "tarnished",
      "defiled"
    ],
    "pronunciation": "/ɪˈmæk.jə.lət/",
    "phonetic": "ih-MAK-yuh-lit",
    "difficulty": "medium",
    "usage_context": "Interior design, formal military inspections, sports technique, and ethics.",
    "memory_tip": "Im- (not) + macula (stain) = completely free from any stain or dirt.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000052-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Triumph",
    "normalized_word": "triumph",
    "simple_meaning": "A great victory, achievement, or milestone celebration",
    "detailed_meaning": "A notable success, conquest, or achievement; the state of being victorious; or joy accompanying victory.",
    "part_of_speech": "noun",
    "example_sentence": "The successful vaccine rollout was celebrated as a monumental triumph of global science.",
    "synonyms": [
      "victory",
      "conquest",
      "mastery",
      "achievement"
    ],
    "antonyms": [
      "defeat",
      "disaster",
      "failure",
      "collapse"
    ],
    "pronunciation": "/ˈtraɪ.ʌmf/",
    "phonetic": "TRY-umf",
    "difficulty": "easy",
    "usage_context": "Scientific breakthroughs, athletic championships, and historical battles.",
    "memory_tip": "Ancient Roman triumph parades were held for victorious generals returning home.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000053-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Tepee",
    "normalized_word": "tepee",
    "simple_meaning": "A portable conical tent traditionally made of animal skins and wooden poles",
    "detailed_meaning": "A conical tent made of skins, cloth, or canvas on a frame of poles, traditionally used by American Plains indigenous peoples.",
    "part_of_speech": "noun",
    "example_sentence": "The cultural heritage museum displayed an authentic replica of a bison-hide tepee.",
    "synonyms": [
      "tipi",
      "lodge",
      "wigwam",
      "conical tent"
    ],
    "antonyms": [],
    "pronunciation": "/ˈtiː.piː/",
    "phonetic": "TEE-pee",
    "difficulty": "easy",
    "usage_context": "Native American history, anthropology, and traditional architecture.",
    "memory_tip": "Dakota/Lakota word \"thípi\" meaning \"a dwelling or place to live\".",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000054-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Muster",
    "normalized_word": "muster",
    "simple_meaning": "To assemble or gather up (forces, courage, or energy)",
    "detailed_meaning": "To bring together for inspection, service, or battle; to summon up a quality like courage or willpower.",
    "part_of_speech": "verb",
    "example_sentence": "She had to muster all her courage before knocking on the CEO’s door.",
    "synonyms": [
      "summon",
      "gather",
      "marshal",
      "rally"
    ],
    "antonyms": [
      "disperse",
      "scatter",
      "disband",
      "relinquish"
    ],
    "pronunciation": "/ˈmʌs.tər/",
    "phonetic": "MUS-ter",
    "difficulty": "medium",
    "usage_context": "Military troop roll calls, rallying team strength, and summoning inner resolve.",
    "memory_tip": "Muster up the courage before you face the monster.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000055-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Detested",
    "normalized_word": "detested",
    "simple_meaning": "Intensely hated and abhorred",
    "detailed_meaning": "Regarded with utmost loathing, extreme hatred, and vehement aversion.",
    "part_of_speech": "adjective",
    "example_sentence": "The detested dictator was swiftly deposed as mass uprisings swept through the capital.",
    "synonyms": [
      "loathed",
      "abhorred",
      "despised",
      "execrated"
    ],
    "antonyms": [
      "beloved",
      "cherished",
      "adored",
      "esteemed"
    ],
    "pronunciation": "/dɪˈtest.ɪd/",
    "phonetic": "dih-TEST-id",
    "difficulty": "easy",
    "usage_context": "Tyrants, corrupt policies, bitter rivalries, and despised villains.",
    "memory_tip": "Detest + ed = hated so much you cannot stand the test of their presence.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000056-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Malocclusion",
    "normalized_word": "malocclusion",
    "simple_meaning": "Imperfect positioning of the teeth when the jaws are closed",
    "detailed_meaning": "A dental irregularity where the teeth of the upper and lower jaws do not fit together properly (overbite, underbite, crossbite).",
    "part_of_speech": "noun",
    "example_sentence": "The orthodontist fitted braces to correct severe malocclusion and relieve jaw strain.",
    "synonyms": [
      "misaligned bite",
      "overbite",
      "crooked teeth",
      "crossbite"
    ],
    "antonyms": [
      "ideal occlusion",
      "aligned bite"
    ],
    "pronunciation": "/ˌmæl.əˈkluː.ʒən/",
    "phonetic": "mal-uh-KLOO-zhun",
    "difficulty": "hard",
    "usage_context": "Dentistry, orthodontics, oral surgery, and dental anatomy.",
    "memory_tip": "Mal- (bad) + occlusion (closing) = bad closing of teeth.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000057-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Trepidation",
    "normalized_word": "trepidation",
    "simple_meaning": "A feeling of fear, agitation, or dread about something that may happen",
    "detailed_meaning": "Tremulous fear, nervous apprehension, or alarm; a nervous agitation caused by impending danger or uncertainty.",
    "part_of_speech": "noun",
    "example_sentence": "She approached the dark cave entrance with intense trepidation and a trembling flashlight.",
    "synonyms": [
      "apprehension",
      "dread",
      "nervousness",
      "anxiety"
    ],
    "antonyms": [
      "confidence",
      "equanimity",
      "assurance",
      "calmness"
    ],
    "pronunciation": "/ˌtrep.ɪˈdeɪ.ʃən/",
    "phonetic": "trep-ih-DAY-shun",
    "difficulty": "hard",
    "usage_context": "Gothic literature, scary challenges, and nervous anticipation before major tests.",
    "memory_tip": "Trepidation makes your hands \"tremble\".",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000058-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Feign",
    "normalized_word": "feign",
    "simple_meaning": "To pretend to be affected by a feeling, state, or injury",
    "detailed_meaning": "To give a false appearance of; to simulate or invent fictitiously (e.g. feign illness or surprise).",
    "part_of_speech": "verb",
    "example_sentence": "He feigned interest in the conversation while sneaking glances at the football scores.",
    "synonyms": [
      "pretend",
      "simulate",
      "fake",
      "affect"
    ],
    "antonyms": [
      "demonstrate genuinely",
      "reveal",
      "disclose"
    ],
    "pronunciation": "/feɪn/",
    "phonetic": "FAYN",
    "difficulty": "medium",
    "usage_context": "Acting, sports feints, pretending illness, and political diplomacy.",
    "memory_tip": "Feign rhymes with \"fake rain\" — creating a false impression.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000059-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Extenuating",
    "normalized_word": "extenuating",
    "simple_meaning": "Serving to lessen the seriousness of an offense or mistake",
    "detailed_meaning": "Providing partial excuses or mitigating circumstances that render a crime, fault, or delay less severe or blameworthy.",
    "part_of_speech": "adjective",
    "example_sentence": "The judge gave a suspended sentence in light of the defendant’s extenuating family circumstances.",
    "synonyms": [
      "mitigating",
      "justifying",
      "exculpatory",
      "moderating"
    ],
    "antonyms": [
      "aggravating",
      "worsening",
      "exacerbating"
    ],
    "pronunciation": "/ɪkˈsten.ju.eɪ.tɪŋ/",
    "phonetic": "ik-STEN-yoo-ay-ting",
    "difficulty": "hard",
    "usage_context": "Courtroom proceedings, judicial sentencing, and academic appeal policies.",
    "memory_tip": "Extenuating \"extends\" an excuse to lessen the blame.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000060-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Apprenticeship",
    "normalized_word": "apprenticeship",
    "simple_meaning": "A period of learning a craft or trade under a skilled master",
    "detailed_meaning": "A formal system of training in a trade, craft, or profession with on-the-job guidance accompanied by theoretical study.",
    "part_of_speech": "noun",
    "example_sentence": "He completed a four-year apprenticeship before qualifying as a certified master carpenter.",
    "synonyms": [
      "internship",
      "traineeship",
      "probation",
      "training period"
    ],
    "antonyms": [
      "mastery",
      "veteran status"
    ],
    "pronunciation": "/əˈpren.tɪs.ʃɪp/",
    "phonetic": "uh-PREN-tis-ship",
    "difficulty": "easy",
    "usage_context": "Skilled trades, vocational education, craftsmanship, and historic guilds.",
    "memory_tip": "Apprentice learns from the master to reach workmanship.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000061-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Gunge",
    "normalized_word": "gunge",
    "simple_meaning": "An unpleasantly sticky, slimy, or messy substance",
    "detailed_meaning": "Informal British term for slimy, messy, viscous, or sludge-like matter (often used in classic game show slime stunts).",
    "part_of_speech": "noun",
    "example_sentence": "He scraped the oily black gunge from the lawnmower blades before storing it.",
    "synonyms": [
      "slime",
      "sludge",
      "muck",
      "goo"
    ],
    "antonyms": [
      "cleanliness",
      "pure water"
    ],
    "pronunciation": "/ɡʌndʒ/",
    "phonetic": "GUNJ",
    "difficulty": "medium",
    "usage_context": "British informal speech, children’s TV shows with slime tanks, and mechanics.",
    "memory_tip": "Goo + grunge = gunge.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.156Z"
  },
  {
    "id": "b0000062-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Squeamishness",
    "normalized_word": "squeamishness",
    "simple_meaning": "Easily made sick, disgusted, or shocked by sights like blood",
    "detailed_meaning": "A tendency to feel nauseated or revulsion easily, especially at the sight of gore, bodily fluids, insects, or ethical cruelty.",
    "part_of_speech": "noun",
    "example_sentence": "Her squeamishness made it impossible for her to watch surgical operations without fainting.",
    "synonyms": [
      "queasiness",
      "delicacy",
      "fastidiousness",
      "revulsion"
    ],
    "antonyms": [
      "stoicism",
      "toughness",
      "stoutheartedness"
    ],
    "pronunciation": "/ˈskwiː.mɪʃ.nəs/",
    "phonetic": "SKWEE-mish-nis",
    "difficulty": "medium",
    "usage_context": "First-aid training, horror movies, dissection labs, and food disgust.",
    "memory_tip": "When you feel squeamish, your stomach makes a \"squeak\" of queasiness.",
    "created_at": "2026-10-26T07:18:29.156Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000063-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Congregation",
    "normalized_word": "congregation",
    "simple_meaning": "A gathering or assembly of people, especially for religious worship",
    "detailed_meaning": "An assembled body of persons brought together for common religious observance, prayer, or fellowship.",
    "part_of_speech": "noun",
    "example_sentence": "The church congregation stood together to sing the traditional harvest hymn.",
    "synonyms": [
      "flock",
      "assembly",
      "fellowship",
      "gathering"
    ],
    "antonyms": [
      "isolation",
      "solitude",
      "dispersion"
    ],
    "pronunciation": "/ˌkɒŋ.ɡrɪˈɡeɪ.ʃən/",
    "phonetic": "kong-grih-GAY-shun",
    "difficulty": "medium",
    "usage_context": "Religious services, community worship, and collective spiritual ceremonies.",
    "memory_tip": "Con- (together) + grex (flock): gathering the flock together.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000064-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Fervent",
    "normalized_word": "fervent",
    "simple_meaning": "Having or displaying passionate, intense enthusiasm or feeling",
    "detailed_meaning": "Burning with passionate warmth, intense devotion, or zealous conviction; marked by great heat or earnestness.",
    "part_of_speech": "adjective",
    "example_sentence": "She was a fervent advocate for environmental protection and renewable clean energy.",
    "synonyms": [
      "passionate",
      "ardent",
      "zealous",
      "vehement"
    ],
    "antonyms": [
      "apathetic",
      "indifferent",
      "lukewarm",
      "half-hearted"
    ],
    "pronunciation": "/ˈfɜː.vənt/",
    "phonetic": "FUR-vuhnt",
    "difficulty": "medium",
    "usage_context": "Political speeches, romantic declarations, religious devotion, and activism.",
    "memory_tip": "Fervent relates to \"fever\" — an intense, burning heat of emotion.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000065-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Ultracrepidarian",
    "normalized_word": "ultracrepidarian",
    "simple_meaning": "A person who expresses opinions on matters outside their knowledge",
    "detailed_meaning": "One who criticizes, judges, or offers confident advice on subjects far beyond their area of expertise or competence (also spelled ultracrepidium in archaic usage).",
    "part_of_speech": "noun",
    "example_sentence": "Social media comment sections are populated by ultracrepidarians who lecture epidemiologists on vaccine science.",
    "synonyms": [
      "presumptuous critic",
      "armchair expert",
      "sciolist",
      "know-it-all"
    ],
    "antonyms": [
      "expert",
      "authority",
      "specialist"
    ],
    "pronunciation": "/ˌʌl.trə.krɛp.ɪˈdɛər.i.ən/",
    "phonetic": "ul-truh-krep-ih-DAIR-ee-uhn",
    "difficulty": "hard",
    "usage_context": "Intellectual critiques of commentators speaking outside their discipline.",
    "memory_tip": "From painter Apelles telling a cobbler who criticized a painted tunic: \"Ne supra crepidam sutor iudicaret\" (A shoemaker should not judge above the sandal).",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000066-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Snollygoster",
    "normalized_word": "snollygoster",
    "simple_meaning": "A shrewd, unprincipled person, especially a dishonest politician",
    "detailed_meaning": "An unscrupulous, deceitful individual who seeks public office or personal gain based on expediency rather than principles.",
    "part_of_speech": "noun",
    "example_sentence": "Voters were tired of smooth-talking snollygosters who switched stances whenever polls fluctuated.",
    "synonyms": [
      "charlatan",
      "rogue",
      "political opportunist",
      "scoundrel"
    ],
    "antonyms": [
      "statesman",
      "person of principle",
      "upright leader"
    ],
    "pronunciation": "/ˈsnɒl.iˌɡɒs.tər/",
    "phonetic": "SNOL-ee-gos-ter",
    "difficulty": "hard",
    "usage_context": "19th-century American political satire, humorous critiques of hypocritical figures.",
    "memory_tip": "Popularized by 1890s American editor who defined it: \"a fellow who wants office regardless of party, platform, or principle\".",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000067-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Pettifogger",
    "normalized_word": "pettifogger",
    "simple_meaning": "An inferior, shifty lawyer who quibbles over trivialities",
    "detailed_meaning": "A lawyer who handles petty cases using trickery, sharp practice, and unscrupulous methods; anyone who argues obsessively over petty details.",
    "part_of_speech": "noun",
    "example_sentence": "The company hired a pettifogger who dragged out the contract dispute with endless microscopic objections.",
    "synonyms": [
      "shyster",
      "quibbler",
      "legal trickster",
      "casuist"
    ],
    "antonyms": [
      "honest jurist",
      "principled counsel"
    ],
    "pronunciation": "/ˈpet.iˌfɒɡ.ər/",
    "phonetic": "PET-ee-fog-er",
    "difficulty": "hard",
    "usage_context": "Legal satire, literary depictions of manipulative barristers, and corporate contract disputes.",
    "memory_tip": "Petty (small/trivial) + fogger (obscuring clarity with petty legal smoke).",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000068-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Blatherskite",
    "normalized_word": "blatherskite",
    "simple_meaning": "A person who talks foolishly and at great length",
    "detailed_meaning": "A voluble, talkative person who chatters endlessly with little substance, sense, or relevance.",
    "part_of_speech": "noun",
    "example_sentence": "The town meeting was held hostage by a blatherskite who ranted about parking meters for an hour.",
    "synonyms": [
      "windbag",
      "babbler",
      "chatterbox",
      "prattler"
    ],
    "antonyms": [
      "laconic speaker",
      "person of few words"
    ],
    "pronunciation": "/ˈblæð.ə.skaɪt/",
    "phonetic": "BLATH-er-skyt",
    "difficulty": "hard",
    "usage_context": "Colloquial Scottish and American humor, exasperated political commentary.",
    "memory_tip": "Blather (to babble nonsense) + skate: a person skating through endless meaningless talk.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000069-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Gobemouche",
    "normalized_word": "gobemouche",
    "simple_meaning": "A gullible person who swallows any rumor or tall tale",
    "detailed_meaning": "A credulous person who is eager to accept whatever absurd story or conspiracy theory they hear (literally French for \"fly-swallower\").",
    "part_of_speech": "noun",
    "example_sentence": "Only a complete gobemouche would believe the lottery scam email promising a royal inheritance.",
    "synonyms": [
      "dupe",
      "simpleton",
      "credulous fool",
      "greenhorn"
    ],
    "antonyms": [
      "skeptic",
      "cynic",
      "critical thinker"
    ],
    "pronunciation": "/ˌɡoʊbˈmuːʃ/",
    "phonetic": "gohb-MOOSH",
    "difficulty": "hard",
    "usage_context": "Satirical literary critiques of credulity and media manipulation.",
    "memory_tip": "From French \"gober\" (to gulp) + \"mouche\" (fly) — standing with mouth open so wide you swallow flies.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000070-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Enticing",
    "normalized_word": "enticing",
    "simple_meaning": "Attractive, tempting, or alluring",
    "detailed_meaning": "Having qualities that awaken desire, interest, or appetite; persuasive in an appealing and seductive way.",
    "part_of_speech": "adjective",
    "example_sentence": "The bakery window displayed an enticing array of warm almond croissants and fresh berry tarts.",
    "synonyms": [
      "alluring",
      "tantalizing",
      "tempting",
      "captivating"
    ],
    "antonyms": [
      "repellent",
      "unappealing",
      "deterrent",
      "revolting"
    ],
    "pronunciation": "/ɪnˈtaɪ.sɪŋ/",
    "phonetic": "in-TY-sing",
    "difficulty": "easy",
    "usage_context": "Food reviews, luxury marketing, travel advertisements, and job offers.",
    "memory_tip": "Enticing puts you \"in ice-cream\" heaven — tempting you to indulge.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000071-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Casserole",
    "normalized_word": "casserole",
    "simple_meaning": "A one-dish meal baked slowly in a deep ovenproof dish",
    "detailed_meaning": "A hearty meal made by combining meat, vegetables, starch, and sauce baked slowly inside a deep, covered ceramic or glass vessel.",
    "part_of_speech": "noun",
    "example_sentence": "On cold winter evenings, my grandmother prepared a steaming chicken and wild rice casserole.",
    "synonyms": [
      "bake",
      "hotpot",
      "ragout",
      "stew"
    ],
    "antonyms": [],
    "pronunciation": "/ˈkæs.ə.roʊl/",
    "phonetic": "KAS-uh-rohl",
    "difficulty": "easy",
    "usage_context": "Comfort food cooking, family potlucks, and culinary recipes.",
    "memory_tip": "French \"casse\" (pan) — everything baked together harmoniously in one dish.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000072-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Threadbare",
    "normalized_word": "threadbare",
    "simple_meaning": "Worn down so much that the threads show; ragged or overused",
    "detailed_meaning": "Cloth that is so old and worn that the individual threads are visible; metaphorically, an idea, argument, or excuse that is tired and stale.",
    "part_of_speech": "adjective",
    "example_sentence": "His favorite childhood armchair had become threadbare at the armrests from decades of use.",
    "synonyms": [
      "shabby",
      "frayed",
      "tatty",
      "worn-out"
    ],
    "antonyms": [
      "pristine",
      "luxurious",
      "fresh",
      "novel"
    ],
    "pronunciation": "/ˈθred.beər/",
    "phonetic": "THRED-bair",
    "difficulty": "medium",
    "usage_context": "Describing antique upholstery, vintage clothes, or cliché arguments.",
    "memory_tip": "The threads are bare because the soft top fabric has rubbed away completely.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000073-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Tor",
    "normalized_word": "tor",
    "simple_meaning": "A high, rocky hill or prominent stone outcrop",
    "detailed_meaning": "A prominent craggy rock outcrop or pile of granite monoliths rising abruptly from the summit of an open hill or moor (common in Dartmoor, UK).",
    "part_of_speech": "noun",
    "example_sentence": "The hikers paused atop the granite tor to admire the sweeping view across the misty moors.",
    "synonyms": [
      "crag",
      "pinnacle",
      "hilltop",
      "promontory"
    ],
    "antonyms": [
      "valley",
      "gorge",
      "depression"
    ],
    "pronunciation": "/tɔːr/",
    "phonetic": "TOR",
    "difficulty": "hard",
    "usage_context": "British geography (Dartmoor and Yorkshire Dales), hiking memoirs, and fantasy settings.",
    "memory_tip": "Short and towering: a tor towers over the moor.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000074-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Dilapidated",
    "normalized_word": "dilapidated",
    "simple_meaning": "In a state of disrepair or ruin as a result of age or neglect",
    "detailed_meaning": "Fallen into partial ruin, decay, or structural breakdown because of longstanding neglect, weathering, or abandonment.",
    "part_of_speech": "adjective",
    "example_sentence": "The young couple bought the dilapidated Victorian mansion and spent five years restoring its grandeur.",
    "synonyms": [
      "ramshackle",
      "decaying",
      "decrepit",
      "run-down"
    ],
    "antonyms": [
      "restored",
      "maintained",
      "pristine",
      "immaculate"
    ],
    "pronunciation": "/dɪˈlæp.ɪ.deɪ.tɪd/",
    "phonetic": "dih-LAP-ih-day-tid",
    "difficulty": "medium",
    "usage_context": "Real estate renovation, haunted house descriptions, and historic ruins.",
    "memory_tip": "Latin \"di-\" (apart) + \"lapis\" (stone): stones falling apart one by one.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000075-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Resurrect",
    "normalized_word": "resurrect",
    "simple_meaning": "To bring back to life or revive from obscurity",
    "detailed_meaning": "To raise from the dead; figuratively, to bring back into use, awareness, or practice after prolonged abandonment.",
    "part_of_speech": "verb",
    "example_sentence": "The director decided to resurrect an overlooked 1980s cult sci-fi series for modern streaming.",
    "synonyms": [
      "revive",
      "reanimate",
      "reinstate",
      "restore"
    ],
    "antonyms": [
      "extinguish",
      "bury",
      "terminate",
      "suppress"
    ],
    "pronunciation": "/ˌrez.əˈrekt/",
    "phonetic": "rez-uh-REKT",
    "difficulty": "medium",
    "usage_context": "Theology, creative revivals of discontinued brands, and reviving old traditions.",
    "memory_tip": "Re- (again) + surge: surging back to life.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000076-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Blasphemy",
    "normalized_word": "blasphemy",
    "simple_meaning": "The act of speaking sacrilegiously about God or sacred things",
    "detailed_meaning": "Great disrespect or irreverent speech directed against holy personages, deities, sacred scriptures, or core religious dogmas.",
    "part_of_speech": "noun",
    "example_sentence": "In medieval Europe, uttering perceived blasphemy against church doctrine brought severe penalties.",
    "synonyms": [
      "sacrilege",
      "profanity",
      "irreverence",
      "heresy"
    ],
    "antonyms": [
      "piety",
      "reverence",
      "devotion",
      "veneration"
    ],
    "pronunciation": "/ˈblæs.fə.mi/",
    "phonetic": "BLAS-fuh-mee",
    "difficulty": "medium",
    "usage_context": "Religious history, freedom of speech jurisprudence, and figurative indignation.",
    "memory_tip": "Greek \"blaptein\" (to harm) + \"pheme\" (speech) = harmful or insulting speech.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000077-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Clandestine",
    "normalized_word": "clandestine",
    "simple_meaning": "Kept secret or done secretly, especially because illicit",
    "detailed_meaning": "Conducted in covert secrecy, concealed from public surveillance or law enforcement due to illicit or stealthy intentions.",
    "part_of_speech": "adjective",
    "example_sentence": "The intelligence operatives held a clandestine rendezvous in an abandoned subway station.",
    "synonyms": [
      "covert",
      "stealthy",
      "undercover",
      "surreptitious"
    ],
    "antonyms": [
      "overt",
      "public",
      "transparent",
      "open"
    ],
    "pronunciation": "/klænˈdes.tɪn/",
    "phonetic": "klan-DES-tin",
    "difficulty": "hard",
    "usage_context": "Espionage, covert military operations, forbidden romances, and undercover stings.",
    "memory_tip": "Plan with your \"clan\" behind closed doors.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000078-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Mangy",
    "normalized_word": "mangy",
    "simple_meaning": "Shabby, scruffy, or suffering from mange (skin disease in animals)",
    "detailed_meaning": "Afflicted with the skin disease mange; by extension, dirty, scruffy, wretched, and thoroughly disreputable in appearance.",
    "part_of_speech": "adjective",
    "example_sentence": "A mangy stray dog trotted past the alleyway garbage bins looking for scraps.",
    "synonyms": [
      "scruffy",
      "shabby",
      "wretched",
      "moth-eaten"
    ],
    "antonyms": [
      "sleek",
      "groomed",
      "healthy",
      "glossy"
    ],
    "pronunciation": "/ˈmeɪn.dʒi/",
    "phonetic": "MAYN-jee",
    "difficulty": "medium",
    "usage_context": "Animal health, gritty urban descriptions, and derogatory characterization.",
    "memory_tip": "Mange is the disease that makes coats lose patches of fur.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000079-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Titter",
    "normalized_word": "titter",
    "simple_meaning": "To give a short, half-suppressed laugh or nervous giggle",
    "detailed_meaning": "To laugh in a quiet, restrained, or slightly mocking and secretive manner, often through clenched lips or behind a hand.",
    "part_of_speech": "verb",
    "example_sentence": "Several pupils tittered at the back of the classroom when the teacher dropped his spectacles.",
    "synonyms": [
      "giggle",
      "snicker",
      "chuckle",
      "tittering"
    ],
    "antonyms": [
      "guffaw",
      "bellow",
      "weep"
    ],
    "pronunciation": "/ˈtɪt.ər/",
    "phonetic": "TIT-er",
    "difficulty": "medium",
    "usage_context": "Classrooms, awkward social gatherings, and aristocratic drawing rooms.",
    "memory_tip": "A tiny \"tit-tit-tit\" nervous laugh.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000080-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Spreadeagle",
    "normalized_word": "spreadeagle",
    "simple_meaning": "To stretch out with arms and legs extended wide",
    "detailed_meaning": "To position someone or stretch oneself out with limbs spread out horizontally like the heraldic emblem of an eagle with wings outspread.",
    "part_of_speech": "verb",
    "example_sentence": "Exhausted after the triathlon, he collapsed spreadeagled on the cool grass.",
    "synonyms": [
      "sprawl",
      "stretch out",
      "straddle"
    ],
    "antonyms": [
      "curl up",
      "huddle",
      "crouch"
    ],
    "pronunciation": "/ˌspredˈiː.ɡəl/",
    "phonetic": "SPRED-ee-guhl",
    "difficulty": "medium",
    "usage_context": "Athletics, emergency pat-downs, and relaxing lazily on a beach or floor.",
    "memory_tip": "Spread out your arms and legs like an eagle soaring wide.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000081-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Grumpy",
    "normalized_word": "grumpy",
    "simple_meaning": "Bad-tempered and easily irritated",
    "detailed_meaning": "Surly, irritable, and inclined to complain in a sour manner; easily annoyed by trivial inconveniences.",
    "part_of_speech": "adjective",
    "example_sentence": "He is notoriously grumpy in the morning until he finishes his second cup of espresso.",
    "synonyms": [
      "cantankerous",
      "crabby",
      "cranky",
      "irritable"
    ],
    "antonyms": [
      "cheerful",
      "good-natured",
      "placid",
      "affable"
    ],
    "pronunciation": "/ˈɡrʌm.pi/",
    "phonetic": "GRUM-pee",
    "difficulty": "easy",
    "usage_context": "Morning moods, cranky elderly neighbors, and humorous character archetypes.",
    "memory_tip": "Think of Grumpy the dwarf from Snow White, arms crossed and scowling.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000082-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Strife",
    "normalized_word": "strife",
    "simple_meaning": "Angry or bitter disagreement; conflict or contention",
    "detailed_meaning": "Vigorous, bitter, or violent conflict between groups, nations, or factions over power, territory, or ideology.",
    "part_of_speech": "noun",
    "example_sentence": "Decades of civil strife tore apart communities and paralyzed economic progress.",
    "synonyms": [
      "conflict",
      "discord",
      "contention",
      "friction"
    ],
    "antonyms": [
      "peace",
      "harmony",
      "concord",
      "amity"
    ],
    "pronunciation": "/straɪf/",
    "phonetic": "STRYF",
    "difficulty": "medium",
    "usage_context": "Political instability, civil wars, and bitter interpersonal disputes.",
    "memory_tip": "Strive without harmony leads to strife.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000083-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Sham",
    "normalized_word": "sham",
    "simple_meaning": "A thing that is not what it is purported to be; a bogus imitation or fraud",
    "detailed_meaning": "Something bogus, false, or intended to deceive by presenting a respectable facade while lacking real substance.",
    "part_of_speech": "noun",
    "example_sentence": "The company’s green energy pledge was criticized by watchdogs as a complete public relations sham.",
    "synonyms": [
      "fraud",
      "hoax",
      "charade",
      "mockery"
    ],
    "antonyms": [
      "the real deal",
      "authenticity",
      "genuineness"
    ],
    "pronunciation": "/ʃæm/",
    "phonetic": "SHAM",
    "difficulty": "easy",
    "usage_context": "Exposing scams, political illusions, and bogus products.",
    "memory_tip": "Shame on those who pull off a sham!",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000084-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Pews",
    "normalized_word": "pews",
    "simple_meaning": "Long wooden benches with backs used for seating in churches",
    "detailed_meaning": "Rows of wooden benches arranged in churches or cathedrals for the seating of the congregation during services.",
    "part_of_speech": "noun",
    "example_sentence": "Sunlight poured through stained-glass windows, illuminating the polished oak pews.",
    "synonyms": [
      "church benches",
      "benches",
      "seats"
    ],
    "antonyms": [],
    "pronunciation": "/pjuːz/",
    "phonetic": "PYOOZ",
    "difficulty": "easy",
    "usage_context": "Ecclesiastical architecture, weddings, Sunday services, and historic buildings.",
    "memory_tip": "People sit in pews to pray.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  },
  {
    "id": "b0000085-0000-0000-0000-000000000000",
    "user_id": SEED_USER_ID,
    "word": "Cavern",
    "normalized_word": "cavern",
    "simple_meaning": "A very large or underground cave",
    "detailed_meaning": "A vast, dark, subterranean chamber, hollowed out by geological water erosion over thousands of years.",
    "part_of_speech": "noun",
    "example_sentence": "The spelunkers lowered themselves into a limestone cavern shimmering with crystalline stalactites.",
    "synonyms": [
      "cave",
      "grotto",
      "hollow",
      "subterranean vault"
    ],
    "antonyms": [],
    "pronunciation": "/ˈkæv.ən/",
    "phonetic": "KAV-ern",
    "difficulty": "easy",
    "usage_context": "Speleology, adventure fantasy, and geological wonders.",
    "memory_tip": "A cavern is an enormous cave that caverns deep into the earth.",
    "created_at": "2026-10-26T07:18:29.157Z",
    "updated_at": "2026-10-26T07:18:29.157Z"
  }
];

export const COMPREHENSIVE_SEED_PROGRESS: WordProgress[] = COMPREHENSIVE_SEED_WORDS.map((w, index) => {
  const isMastered = index === 0;
  const isLearned = index === 1;
  const isDueToday = index < 15;

  return {
    id: `p${w.id.slice(1)}`,
    word_id: w.id,
    user_id: SEED_USER_ID,
    status: isMastered ? 'mastered' : isLearned ? 'learned' : 'learning',
    learning_stage: isMastered ? 'mastered' : isLearned ? 'reviewing' : 'new',
    repetition_count: isMastered ? 4 : isLearned ? 2 : 0,
    interval_days: isMastered ? 6 : isLearned ? 2 : 0,
    ease_factor: 2.5,
    last_reviewed_at: isMastered || isLearned ? new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() : null,
    next_review_at: isDueToday ? new Date().toISOString() : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    correct_count: isMastered ? 4 : isLearned ? 2 : 0,
    incorrect_count: 0,
    forgot_count: 0,
    hard_count: 0,
    good_count: isMastered ? 3 : isLearned ? 2 : 0,
    easy_count: isMastered ? 1 : 0,
    created_at: w.created_at,
    updated_at: w.updated_at,
  };
});
