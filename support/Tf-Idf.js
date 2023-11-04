// Function to tokenize the input text
function tokenize(text) {
    return text.toLowerCase().match(/\b\w+\b/g);
}

// Function to remove stopwords from tokens
function removeStopwords(tokens, stopwords) {
    return tokens.filter(token => !stopwords.includes(token));
}

// Function to calculate term frequency (TF)
function calculateTF(tokens) {
    let tf = {};
    tokens.forEach(token => {
        tf[token] = (tf[token] || 0) + 1;
    });
    return tf;
}

// Function to calculate inverse document frequency (IDF)
// For simplicity, IDF is based on the presence of the term in the document
function calculateIDF(tokens, allDocuments) {
    let idf = {};
    tokens.forEach(token => {
        if (allDocuments.some(document => document.includes(token))) {
            idf[token] = 1; // Term is present in at least one document
        } else {
            idf[token] = 0; // Term is not present in any document
        }
    });
    return idf;
}

// Function to calculate TF-IDF
function calculateTFIDF(tf, idf) {
    let tfidf = {};
    Object.keys(tf).forEach(token => {
        tfidf[token] = tf[token] * idf[token];
    });
    return tfidf;
}

// Example usage
const document = "Pasal 381:\nBarang siapa dengan jalan tipu muslihat menyesatkan penanggung asuransi mengenai keadaan-keadaan yang berhubungan dengan pertanggungan sehingga disetujui perjanjian, hal mana tentu tidak akan disetujuinya atau setidak-tidaknya tidak dengan syarat- syarat yang demikian, jika diketahuinya keadaan-keadaan sebenarnya diancam dengan pidana penjara paling lama satu tahun empat bulan.";
const stopwords =[
  "ada", "adalah", "adanya", "adapun", "agak", "agaknya", "agar", "akan", "akankah", "akhir", 
  "akhiri", "akhirnya", "aku", "akulah", "amat", "amatlah", "anda", "andalah", "antar", "antara", 
  "antaranya", "apa", "apaan", "apabila", "apakah", "apalagi", "apatah", "artinya", "asal", 
  "asalkan", "atas", "atau", "ataukah", "ataupun", "awal", "awalnya", "bagai", "bagaikan", 
  "bagaimana", "bagaimanakah", "bagaimanapun", "bagi", "bagian", "bahkan", "bahwa", "bahwasanya", 
  "baik", "bakal", "bakalan", "balik", "banyak", "bapak", "baru", "bawah", "beberapa", "begini", 
  "beginian", "beginikah", "beginilah", "begitu", "begitukah", "begitulah", "begitupun", "bekerja", 
  "belakang", "belakangan", "belum", "belumlah", "benar", "benarkah", "benarlah", "berada", 
  "berakhir", "berakhirlah", "berakhirnya", "berapa", "berapakah", "berapalah", "berapapun", "berarti", 
  "berawal", "berbagai", "berdatangan", "beri", "berikan", "berikut", "berikutnya", "berjumlah", 
  "berkali-kali", "berkata", "berkehendak", "berkeinginan", "berkenaan", "berlainan", "berlalu", 
  "berlangsung", "berlebihan", "bermacam", "bermacam-macam", "bermaksud", "bermula", "bersama", 
  "bersama-sama", "bersiap", "bersiap-siap", "bertanya", "bertanya-tanya", "berturut", "berturut-turut", 
  "bertutur", "berujar", "berupa", "besar", "betul", "betulkah", "biasa", "biasanya", "bila", "bilakah", 
  "bisa", "bisakah", "boleh", "bolehkah", "bolehlah", "buat", "bukan", "bukankah", "bukanlah", "bukannya", 
  "bulan", "bung", "cara", "caranya", "cukup", "cukupkah", "cukuplah", "cuma", "dahulu", "dalam", "dan", 
  "dapat", "dari", "daripada", "datang", "dekat", "demi", "demikian", "demikianlah", "dengan", "depan", 
  "di", "dia", "diakhiri", "diakhirinya", "dialah", "diantara", "diantaranya", "diberi", "diberikan", 
  "diberikannya", "dibuat", "dibuatnya", "didapat", "didatangkan", "digunakan", "diibaratkan", 
  "diibaratkannya", "diingat", "diingatkan", "diinginkan", "dijawab", "dijelaskan", "dijelaskannya", 
  "dikarenakan", "dikatakan", "dikatakannya", "dikerjakan", "diketahui", "diketahuinya", "dikira", 
  "dilakukan", "dilalui", "dilihat", "dimaksud", "dimaksudkan", "dimaksudkannya", "dimaksudnya", "diminta", 
  "dimintai", "dimisalkan", "dimulai", "dimulailah", "dimulainya", "dimungkinkan", "dini", "dipastikan", 
  "diperbuat", "diperbuatnya", "dipergunakan", "diperkirakan", "diperlihatkan", "diperlukan", 
  "diperlukannya", "dipersoalkan", "dipertanyakan", "dipunyai", "diri", "dirinya", "disampaikan", 
  "disebut", "disebutkan", "disebutkannya", "disini", "disinilah", "ditambahkan", "ditandaskan", 
  "ditanya", "ditanyai", "ditanyakan", "ditegaskan", "ditujukan", "ditunjuk", "ditunjuki", "ditunjukkan", 
  "ditunjukkannya", "ditunjuknya", "dituturkan", "dituturkannya", "diucapkan", "diucapkannya", 
  "diungkapkan", "dong", "dua", "dulu", "empat", "enggak", "enggaknya", "entah", "entahlah", "guna", 
  "gunakan", "hal", "hampir", "hanya", "hanyalah", "hari", "harus", "haruslah", "harusnya", "hendak", 
  "hendaklah", "hendaknya", "hingga", "ia", "ialah", "ibarat", "ibaratkan", "ibaratnya", "ibu", "ikut", 
  "ingat", "ingat-ingat", "ingin", "inginkah", "inginkan", "ini", "inikah", "inilah", "itu", "itukah", 
  "itulah", "jadi", "jadilah", "jadinya", "jangan", "jangankan", "janganlah", "jauh", "jawab", "jawaban", 
  "jawabnya", "jelas", "jelaskan", "jelaslah", "jelasnya", "jika", "jikalau", "juga", "jumlah", "jumlahnya", 
  "justru", "kala", "kalau", "kalaulah", "kalaupun", "kalian", "kami", "kamilah", "kamu", "kamulah", "kan", 
  "kapan", "kapankah", "kapanpun", "karena", "karenanya", "kasus", "kata", "katakan", "katakanlah", "katanya", 
  "ke", "keadaan", "kebetulan", "kecil", "kedua", "keduanya", "keinginan", "kelamaan", "kelihatan", 
  "kelihatannya", "kelima", "keluar", "kembali", "kemudian", "kemungkinan", "kemungkinannya", "kenapa", 
  "kepada", "kepadanya", "kesampaian", "keseluruhan", "keseluruhannya", "keterlaluan", "ketika", "khususnya", 
  "kini", "kinilah", "kira", "kira-kira", "kiranya", "kita", "kitalah", "kok", "kurang", "lagi", "lagian", "lah", 
  "lain", "lainnya", "lalu", "lama", "lamanya", "lanjut", "lanjutnya", "lebih", "lewat", "lima", "luar", "macam", 
  "maka", "makanya", "makin", "malah", "malahan", "mampu", "mampukah", "mana", "manakala", "manalagi", "masa", 
  "masalah", "masalahnya", "masih", "masihkah", "masing", "masing-masing", "mau", "maupun", "melainkan", 
  "melakukan", "melalui", "melihat", "melihatnya", "memang", "memastikan", "memberi", "memberikan", "membuat", 
  "memerlukan", "memihak", "meminta", "memintakan", "memisalkan", "memperbuat", "mempergunakan", 
  "memperkirakan", "memperlihatkan", "mempersiapkan", "mempersoalkan", "mempertanyakan", "mempunyai", "memulai", 
  "memungkinkan", "menaiki", "menambahkan", "menandaskan", "menanti", "menanti-nanti", "menantikan", "menanya", 
  "menanyai", "menanyakan", "mendapat", "mendapatkan", "mendatang", "mendatangi", "mendatangkan", "menegaskan", 
  "mengakhiri", "mengapa", "mengatakan", "mengatakannya", "mengenai", "mengerjakan", "mengetahui", "menggunakan", 
  "menghendaki", "mengibaratkan", "mengibaratkannya", "mengingat", "mengingatkan", "menginginkan", "mengira", 
  "mengucapkan", "mengucapkannya", "mengungkapkan", "menjadi", "menjawab", "menjelaskan", "menuju", "menunjuk", 
  "menunjuki", "menunjukkan", "menunjuknya", "menurut", "menuturkan", "menyampaikan", "menyangkut", "menyatakan", 
  "menyebutkan", "menyeluruh", "menyiapkan", "merasa", "mereka", "merekalah", "merupakan", "meski", "meskipun", 
  "meyakini", "meyakinkan", "minta", "mirip", "misal", "misalkan", "misalnya", "mula", "mulai", "mulailah", 
  "mulanya", "mungkin", "mungkinkah", "nah", "naik", "namun", "nanti", "nantinya", "nyaris", "nyatanya", "oleh", 
  "olehnya", "pada", "padahal", "padanya", "pak", "paling", "panjang", "pantas", "para", "pasti", "pastilah", 
  "penting", "pentingnya", "per", "percuma", "perlu", "perlukah", "perlunya", "pernah", "persoalan", "pertama", 
  "pertama-tama", "pertanyaan", "pertanyakan", "pihak", "pihaknya", "pukul", "pula", "pun", "punya", "rasa", 
  "rasanya", "rata", "rupanya", "saat", "saatnya", "saja", "sajalah", "saling", "sama", "sama-sama", "sambil", 
  "sampai", "sampai-sampai", "sampaikan", "sana", "sangat", "sangatlah", "satu", "saya", "sayalah", "se", 
  "sebab", "sebabnya", "sebagai", "sebagaimana", "sebagainya", "sebagian", "sebaik", "sebaik-baiknya", 
  "sebaiknya", "sebaliknya", "sebanyak", "sebegini", "sebegitu", "sebelum", "sebelumnya", "sebenarnya", 
  "seberapa", "sebesar", "sebetulnya", "sebisanya", "sebuah", "sebut", "sebutlah", "sebutnya", "secara", 
  "secukupnya", "sedang", "sedangkan", "sedemikian", "sedikit", "sedikitnya", "seenaknya", "segala", 
  "segalanya", "segera", "seharusnya", "sehingga", "seingat", "sejak", "sejauh", "sejenak", "sejumlah", 
  "sekadar", "sekadarnya", "sekali", "sekali-kali", "sekalian", "sekaligus", "sekalipun", "sekarang", 
  "sekecil", "seketika", "sekiranya", "sekitar", "sekitarnya", "sekurang-kurangnya", "sekurangnya", "sela", 
  "selagi", "selain", "selaku", "selalu", "selama", "selama-lamanya", "selamanya", "selanjutnya", "seluruh", 
  "seluruhnya", "semacam", "semakin", "semampu", "semampunya", "semasa", "semata", "semata-mata", "semaunya", 
  "sementara", "semisal", "semisalnya", "sempat", "semua", "semuanya", "semula", "sendiri", "sendirian", 
  "sendirinya", "seolah", "seolah-olah", "seorang", "sepanjang", "sepantasnya", "sepantasnyalah", "seperlunya", 
  "seperti", "sepertinya", "sepihak", "sering", "seringnya", "serta", "serupa", "sesaat", "sesama", "sesampai", 
  "sesegera", "sesekali", "seseorang", "sesuatu", "sesuatunya", "sesudah", "sesudahnya", "setelah", "setempat", 
  "setengah", "seterusnya", "setiap", "setiba", "setibanya", "setidak-tidaknya", "setidaknya", "setinggi", 
  "seusai", "sewaktu", "siap", "siapa", "siapakah", "siapapun", "sini", "sinilah", "soal", "soalnya", "suatu", 
  "sudah", "sudahkah", "sudahlah", "supaya", "tadi", "tadinya", "tahu", "tahun", "tak", "tambah", "tambahnya", 
  "tampak", "tampaknya", "tandas", "tandasnya", "tanpa", "tanya", "tanyakan", "tanyanya", "tapi", "tegas", 
  "tegasnya", "telah", "tempat", "tengah", "tentang", "tentu", "tentulah", "tentunya", "tepat", "terakhir", 
  "terasa", "terbanyak", "terdahulu", "terdapat", "terdiri", "terhadap", "terhadapnya", "teringat", 
  "teringat-ingat", "terjadi", "terjadilah", "terjadinya", "terkira", "terlalu", "terlebih", "terlihat", 
  "termasuk", "ternyata", "tersampaikan", "tersebut", "tersebutlah", "tertentu", "tertuju", "terus", "terutama", 
  "tetap", "tetapi", "tiap", "tiba", "tiba-tiba", "tidak", "tidakkah", "tidaklah", "tiga", "tinggi", "toh", 
  "tunjuk", "turut", "tutur", "tuturnya", "ucap", "ucapnya", "ujar", "ujarnya", "umum", "umumnya", "ungkap", 
  "ungkapnya", "untuk", "usah", "usai", "waduh", "wah", "wahai", "waktu", "waktunya", "walau", "walaupun", "wong", 
  "yaitu", "yakin", "yakni", "yang"
];


// Tokenize and remove stopwords
const tokens = removeStopwords(tokenize(document), stopwords);
const tf = calculateTF(tokens);

// For simplicity, assuming only one document for IDF calculation
const allDocuments = [document];
const idf = calculateIDF(tokens, allDocuments);

const tfidf = calculateTFIDF(tf, idf);

// Display the TF-IDF scores
console.log("TF-IDF Scores:");
Object.keys(tfidf).forEach(token => {
    console.log(`${token}: ${tfidf[token]}`);
});
