// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "No baskets found.": "No baskets found.",
      "Add Basket": "Add Basket",
      Basket: "Basket",
      "Update Basket": "Update Basket",
      "Save Changes": "Save Changes",
      "Last updated:": "Last updated:",
      "No items in this basket.": "No items in this basket.",
      "Price:": "Price:",
      Add: "Add",
      "Search here...": "Search here...",
      "Log Out": "Log Out",
      Name: "Name",
      Email: "Email",
      Birthdate: "Birthdate",
      Save: "Save",
      "Change Photo": "Change Photo",
      "Uploading...": "Uploading...",
      "Select Language": "Select Language",
      Language: "Language",
      "Go to your cart": "Go to your cart",
      "Show Database Data": "Show Database Data",
      Login: "Login",
      Logout: "Logout",
      Signup: "Signup",
      "Login Please 😉!": "Login Please 😉!",
      "Signup Please 😉!": "Signup Please 😉!",
      "Don't have an account?": "Don't have an account?",
      "Already have an account?": "Already have an account?",
      "Sign up": "Sign up",
      "Basket deleted!": "Basket deleted!",
      "Basket saved!": "Basket saved!",
      "New basket created": "New basket created...",
      "No images to display.": "No images to display.",
      "All Users & Their Baskets": "All Users & Their Baskets",
      User: "User",
      "Name:": "Name:",
      "Email:": "Email:",
      "UID:": "UID:",
      "Birthdate:": "Birthdate:",
      "Baskets:": "Baskets:",
      "No baskets.": "No baskets.",
      "Basket ID:": "Basket ID:",
      "User Email:": "User Email:",
      "Items:": "Items:",
      "Loading...": "Loading...",
      "Go to Cart": "Go to Cart",
      Close: "Close",
      "Enter Password": "Enter Password",
      Password: "Password",
      Home: "Home",
      Admin: "Admin",
      All: "All",
      Biscuits: "Biscuits",
      Chocolate: "Chocolate",
      Vegetable: "Vegetable",
      Fruit: "Fruit",
      Meat: "Meat",
      Dairy: "Dairy",
      Bakery: "Bakery",

      products: {
        1: "Basmati Rice",
        2: "Toor Dal",
        3: "Aashirvaad Atta",
        4: "Amul Butter",
        5: "Parle-G Biscuits",
        6: "Tata Salt",
        7: "Maggi Noodles",
        8: "Dairy Milk",
        9: "Onion (1kg)",
        10: "Tomato (1kg)",
        11: "Potato (1kg)",
        12: "Banana (1 dozen)",
        13: "Apple (1kg)",
        14: "Orange (1kg)",
        15: "Chicken (1kg)",
        16: "Eggs (12 pcs)",
        17: "Milk (1 liter)",
        18: "Sugar (1kg)",
        19: "Tea Powder (250g)",
        20: "Coffee Powder (100g)",
        21: "Cooking Oil (1 liter)",
        22: "Salt (1kg)",
        23: "Wheat Flour (1kg)",
        24: "Green Peas (500g)",
        25: "Coriander Leaves (1 bunch)",
        26: "Cumin Seeds (100g)",
        27: "Chili Powder (100g)",
        28: "Turmeric Powder (100g)",
        29: "Ginger (250g)",
        30: "Garlic (250g)",
        31: "Paneer (200g)",
        32: "Yogurt (500g)",
        33: "Lemon (1kg)",
        34: "Cucumber (1kg)",
        35: "Carrot (1kg)",
        36: "Capsicum (1kg)",
        37: "Spinach (1 bunch)",
        38: "Cauliflower (1 piece)",
        39: "Bottle Gourd (1kg)",
        40: "Pumpkin (1kg)",
        41: "Brinjal (1kg)",
        42: "Mango (1kg)",
        43: "Papaya (1kg)",
        44: "Pineapple (1 piece)",
        45: "Watermelon (1 piece)",
        46: "Sweet Corn (1 piece)",
        47: "Brown Bread (1 loaf)",
        48: "Salted Butter (200g)",
        49: "Jam (250g)",
        50: "Honey (250g)",
      },
    },
  },
  gu: {
    translation: {
      "No baskets found.": "કોઈ ટોપલા મળ્યા નથી.",
      "Add Basket": "ટોપલો ઉમેરો",
      Basket: "ટોપલો",
      "Update Basket": "ટોપલો અપડેટ કરો",
      "Save Changes": "ફેરફાર સાચવો",
      "Last updated:": "છેલ્લે અપડેટ થયું:",
      "No items in this basket.": "આ ટોપલામાં કોઈ વસ્તુ નથી.",
      "Price:": "ભાવ:",
      Add: "ઉમેરો",
      "Search here...": "અહીં શોધો...",
      "Log Out": "લૉગ આઉટ",
      Name: "નામ",
      Email: "ઇમેઇલ",
      Birthdate: "જન્મ તારીખ",
      Save: "સાચવો",
      "Change Photo": "ફોટો બદલો",
      "Uploading...": "અપલોડ થઈ રહ્યું છે...",
      "Select Language": "ભાષા પસંદ કરો",
      Language: "ભાષા",
      "Go to your cart": "તમારા કાર્ટમાં જાઓ",
      "Show Database Data": "ડેટાબેઝ ડેટા બતાવો",
      Login: "લૉગિન",
      Logout: "લૉગઆઉટ",
      Signup: "સાઇન અપ",
      "Login Please 😉!": "મહેરબાની કરીને લૉગિન કરો 😉!",
      "Signup Please 😉!": "મહેરબાની કરીને સાઇન અપ કરો 😉!",
      "Don't have an account?": "અગાઉથી એકાઉન્ટ નથી?",
      "Already have an account?": "પહેલેથી જ એકાઉન્ટ છે?",
      "Sign up": "સાઇન અપ",
      "Basket deleted!": "ટોપલો ડિલીટ થયો!",
      "Basket saved!": "ટોપલો સાચવાયો!",
      "New basket created": "નવો ટોપલો બનાવાયો...",
      "No images to display.": "દેખાડવા માટે છબીઓ નથી.",
      "All Users & Their Baskets": "બધા વપરાશકર્તાઓ અને તેમના ટોપલા",
      User: "વપરાશકર્તા",
      "Name:": "નામ:",
      "Email:": "ઇમેઇલ:",
      "UID:": "યુઆઇડી:",
      "Birthdate:": "જન્મ તારીખ:",
      "Baskets:": "ટોપલા:",
      "No baskets.": "કોઈ ટોપલા નથી.",
      "Basket ID:": "ટોપલો આઈડી:",
      "User Email:": "વપરાશકર્તા ઇમેઇલ:",
      "Items:": "વસ્તુઓ:",
      "Loading...": "લોડ થઈ રહ્યું છે...",
      "Go to Cart": "કાર્ટ પર જાઓ",
      Close: "બંધ કરો",
      "Enter Password": "પાસવર્ડ દાખલ કરો",
      Password: "પાસવર્ડ",
      Home: "ઘર",
      Admin: "એડમિન",
      All: "બધું",
      Biscuits: "બિસ્કિટ",
      Chocolate: "ચોકલેટ",
      Vegetable: "શાકભાજી",
      Fruit: "ફળ",
      Meat: "માંસ",
      Dairy: "ડેરી",
      Bakery: "બેકરી",
      products: {
        1: "બાસમતી ચોખા",
        2: "તૂવર દાળ",
        3: "આશીર્વાદ આટા",
        4: "અમૂલ બટર",
        5: "પારલે-જી બિસ્કિટ",
        6: "ટાટા મીઠું",
        7: "મેગી નૂડલ્સ",
        8: "ડેરી મિલ્ક",
        9: "દૂધી (1 કિગ્રા)",
        10: "ટમેટું (1 કિગ્રા)",
        11: "બટાકા (1 કિગ્રા)",
        12: "કેળા (1 ડઝન)",
        13: "સફરજન (1 કિગ્રા)",
        14: "નારંગી (1 કિગ્રા)",
        15: "ચિકન (1 કિગ્રા)",
        16: "અંડા (12 પીસ)",
        17: "દૂધ (1 લિટર)",
        18: "સાકર (1 કિગ્રા)",
        19: "ચા પાઉડર (250 ગ્રામ)",
        20: "કોફી પાઉડર (100 ગ્રામ)",
        21: "તેલ (1 લિટર)",
        22: "મીઠું (1 કિગ્રા)",
        23: "ઘઉંનો લોટ (1 કિગ્રા)",
        24: "લીલા વટાણા (500 ગ્રામ)",
        25: "ધાણાની પત્તી (1 ગાંઠ)",
        26: "જીરું (100 ગ્રામ)",
        27: "લાલ મરચું પાવડર (100 ગ્રામ)",
        28: "હળદર પાવડર (100 ગ્રામ)",
        29: "આદુ (250 ગ્રામ)",
        30: "લસણ (250 ગ્રામ)",
        31: "પનીર (200 ગ્રામ)",
        32: "દહીં (500 ગ્રામ)",
        33: "લીંબુ (1 કિગ્રા)",
        34: "કાકડી (1 કિગ્રા)",
        35: "ગાજર (1 કિગ્રા)",
        36: "શિમલા મરચું (1 કિગ્રા)",
        37: "પાલક (1 ગાંઠ)",
        38: "ફૂલી કોબી (1 પીસ)",
        39: "દૂધી (1 કિગ્રા)",
        40: "કોળું (1 કિગ્રા)",
        41: "રીંગણ (1 કિગ્રા)",
        42: "કેરી (1 કિગ્રા)",
        43: "પપૈયું (1 કિગ્રા)",
        44: "અનાસ (1 પીસ)",
        45: "તરબૂચ (1 પીસ)",
        46: "મીઠું મકાઈ (1 પીસ)",
        47: "બ્રાઉન બ્રેડ (1 લોફ)",
        48: "મીઠું બટર (200 ગ્રામ)",
        49: "જેમ (250 ગ્રામ)",
        50: "મધ (250 ગ્રામ)",
      },
    },
  },
  rj: {
    translation: {
      "No baskets found.": "कोई टोकरी नीं मिली.",
      "Add Basket": "टोकरी जोड़ो",
      Basket: "टोकरी",
      "Update Basket": "टोकरी बदलो",
      "Save Changes": "बदलाव सांचो",
      "Last updated:": "पाछलो अपडेट:",
      "No items in this basket.": "टोकरी में कुछ नीं है.",
      "Price:": "कीमत:",
      Add: "जोड़ो",
      "Search here...": "इते खोजो...",
      "Log Out": "बाहर जावो",
      Name: "नाव",
      Email: "ईमेल",
      Birthdate: "जन्म तारीख",
      Save: "सांचो",
      "Change Photo": "फोटो बदलो",
      "Uploading...": "चढ़ाय रिया है...",
      "Select Language": "भासा चुनो",
      Language: "भासा",
      "Go to your cart": "आपरी टोकरी में जावो",
      "Show Database Data": "डाटा देखावो",
      Login: "लॉगिन",
      Logout: "लॉगआउट",
      Signup: "साइनअप",
      "Login Please 😉!": "कृपया लॉगिन करो 😉!",
      "Signup Please 😉!": "कृपया साइनअप करो 😉!",
      "Don't have an account?": "अभी तक खाता नीं है?",
      "Already have an account?": "पहले तैं खाता है?",
      "Sign up": "साइन अप करो",
      "Basket deleted!": "टोकरी हटाई गई!",
      "Basket saved!": "टोकरी सांची गई!",
      "New basket created": "नवी टोकरी बनाई गई...",
      "No images to display.": "कोई फोटो नीं दिखाणे को.",
      "All Users & Their Baskets": "सब उपयोगकर्ता और टोकरी",
      User: "उपयोगकर्ता",
      "Name:": "नाव:",
      "Email:": "ईमेल:",
      "UID:": "यूआईडी:",
      "Birthdate:": "जन्म तारीख:",
      "Baskets:": "टोकरी:",
      "No baskets.": "कोई टोकरी नीं.",
      "Basket ID:": "टोकरी आईडी:",
      "User Email:": "उपयोगकर्ता ईमेल:",
      "Items:": "सामान:",
      "Loading...": "लोड हो रिया है...",
      "Go to Cart": "टोकरी में जावो",
      Close: "बंद करो",
      "Enter Password": "पासवर्ड भरो",
      Password: "पासवर्ड",
      Home: "घर",
      Admin: "एडमिन",
      All: "सब",
      Biscuits: "बिस्कुट",
      Chocolate: "चॉकलेट",
      Vegetable: "सब्जी",
      Fruit: "फल",
      Meat: "मांस",
      Dairy: "डेयरी",
      Bakery: "बेकरी",
      products: {
        1: "बासमती चावल",
        2: "तूर दाल",
        3: "आशीर्वाद आटा",
        4: "अमूल बटर",
        5: "पारले-जी बिस्कुट",
        6: "टाटा नमक",
        7: "मैगी नूडल्स",
        8: "डेयरी मिल्क",
        9: "प्याज (1किग्रा)",
        10: "टमाटर (1किग्रा)",
        11: "आलू (1किग्रा)",
        12: "केला (1 दर्जन)",
        13: "सेब (1किग्रा)",
        14: "संतरा (1किग्रा)",
        15: "चिकन (1किग्रा)",
        16: "अंडे (12 पीस)",
        17: "दूध (1 लीटर)",
        18: "चीनी (1किग्रा)",
        19: "चाय पाउडर (250ग्राम)",
        20: "कॉफी पाउडर (100ग्राम)",
        21: "तेल (1 लीटर)",
        22: "नमक (1किग्रा)",
        23: "गेहूं का आटा (1किग्रा)",
        24: "हरी मटर (500ग्राम)",
        25: "धनिया पत्ता (1 गड्डी)",
        26: "जीरा (100ग्राम)",
        27: "लाल मिर्च पाउडर (100ग्राम)",
        28: "हल्दी पाउडर (100ग्राम)",
        29: "अदरक (250ग्राम)",
        30: "लहसुन (250ग्राम)",
        31: "पनीर (200ग्राम)",
        32: "दही (500ग्राम)",
        33: "नींबू (1किग्रा)",
        34: "खीरा (1किग्रा)",
        35: "गाजर (1किग्रा)",
        36: "शिमला मिर्च (1किग्रा)",
        37: "पालक (1 गड्डी)",
        38: "फूलगोभी (1 पीस)",
        39: "लौकी (1किग्रा)",
        40: "कद्दू (1किग्रा)",
        41: "बैंगन (1किग्रा)",
        42: "आम (1किग्रा)",
        43: "पपीता (1किग्रा)",
        44: "अनानास (1 पीस)",
        45: "तरबूज (1 पीस)",
        46: "स्वीट कॉर्न (1 पीस)",
        47: "ब्राउन ब्रेड (1 लोफ)",
        48: "नमकीन मक्खन (200ग्राम)",
        49: "जैम (250ग्राम)",
        50: "शहद (250ग्राम)",
      },
    },
  },

  fr: {
    translation: {
      "No baskets found.": "Aucun panier trouvé.",
      "Add Basket": "Ajouter un panier",
      Basket: "Panier",
      "Update Basket": "Mettre à jour le panier",
      "Save Changes": "Enregistrer",
      "Last updated:": "Dernière mise à jour :",
      "No items in this basket.": "Aucun article dans ce panier.",
      "Price:": "Prix :",
      Add: "Ajouter",
      "Search here...": "Rechercher...",
      "Log Out": "Se déconnecter",
      Name: "Nom",
      Email: "Email",
      Birthdate: "Date de naissance",
      Save: "Enregistrer",
      "Change Photo": "Changer la photo",
      "Uploading...": "Téléchargement...",
      //   "Select Language": "Choisir la langue",
      Language: "Langue",
      "Go to your cart": "Aller à votre panier",
      "Show Database Data": "Afficher les données de la base",
      Login: "Connexion",
      Logout: "Déconnexion",
      Signup: "Inscription",
      "Login Please 😉!": "Veuillez vous connecter 😉!",
      "Signup Please 😉!": "Veuillez vous inscrire 😉!",
      "Don't have an account?": "Vous n'avez pas de compte ?",
      "Already have an account?": "Vous avez déjà un compte ?",
      "Sign up": "S'inscrire",
      "Basket deleted!": "Panier supprimé !",
      "Basket saved!": "Panier enregistré !",
      "New basket created": "Nouveau panier créé...",
      "No images to display.": "Aucune image à afficher.",
      "All Users & Their Baskets": "Tous les utilisateurs et leurs paniers",
      User: "Utilisateur",
      "Name:": "Nom :",
      "Email:": "Email :",
      "UID:": "UID :",
      "Birthdate:": "Date de naissance :",
      "Baskets:": "Paniers :",
      "No baskets.": "Aucun panier.",
      "Basket ID:": "ID du panier :",
      "User Email:": "Email de l'utilisateur :",
      "Items:": "Articles :",
      "Loading...": "Chargement...",
      "Go to Cart": "Aller au panier",
      Close: "Fermer",
      "Enter Password": "Entrez le mot de passe",
      Password: "Mot de passe",
      Home: "Accueil",
      Admin: "Admin",
      All: "Tout",
      Biscuits: "Biscuits",
      Chocolate: "Chocolat",
      Vegetable: "Légume",
      Fruit: "Fruit",
      Meat: "Viande",
      Dairy: "Produits laitiers",
      Bakery: "Boulangerie",
      Kitchen: "Cuisine",

      products: {
        1: "Riz Basmati",
        2: "Toor Dal",
        3: "Farine Aashirvaad",
        4: "Beurre Amul",
        5: "Biscuits Parle-G",
        6: "Sel Tata",
        7: "Nouilles Maggi",
        8: "Lait Dairy Milk",
        9: "Oignon (1kg)",
        10: "Tomate (1kg)",
        11: "Pomme de terre (1kg)",
        12: "Banane (1 douzaine)",
        13: "Pomme (1kg)",
        14: "Orange (1kg)",
        15: "Poulet (1kg)",
        16: "Œufs (12 pièces)",
        17: "Lait (1 litre)",
        18: "Sucre (1kg)",
        19: "Thé en poudre (250g)",
        20: "Café en poudre (100g)",
        21: "Huile de cuisson (1 litre)",
        22: "Sel (1kg)",
        23: "Farine de blé (1kg)",
        24: "Pois verts (500g)",
        25: "Feuilles de coriandre (1 botte)",
        26: "Graines de cumin (100g)",
        27: "Poudre de chili (100g)",
        28: "Poudre de curcuma (100g)",
        29: "Gingembre (250g)",
        30: "Ail (250g)",
        31: "Paneer (200g)",
        32: "Yaourt (500g)",
        33: "Citron (1kg)",
        34: "Concombre (1kg)",
        35: "Carotte (1kg)",
        36: "Poivron (1kg)",
        37: "Épinards (1 botte)",
        38: "Chou-fleur (1 pièce)",
        39: "Courge bouteille (1kg)",
        40: "Citrouille (1kg)",
        41: "Aubergine (1kg)",
        42: "Mangue (1kg)",
        43: "Papaye (1kg)",
        44: "Ananas (1 pièce)",
        45: "Pastèque (1 pièce)",
        46: "Maïs doux (1 pièce)",
        47: "Pain brun (1 miche)",
        48: "Beurre salé (200g)",
        49: "Confiture (250g)",
        50: "Miel (250g)",
      },
    },
  },
  de: {
    translation: {
      "No baskets found.": "Keine Körbe gefunden.",
      "Add Basket": "Korb hinzufügen",
      Basket: "Korb",
      "Update Basket": "Korb aktualisieren",
      "Save Changes": "Änderungen speichern",
      "Last updated:": "Zuletzt aktualisiert:",
      "No items in this basket.": "Keine Artikel in diesem Korb.",
      "Price:": "Preis:",
      Add: "Hinzufügen",
      "Search here...": "Hier suchen...",
      "Log Out": "Abmelden",
      Name: "Name",
      Email: "E-Mail",
      Birthdate: "Geburtsdatum",
      Save: "Speichern",
      "Change Photo": "Foto ändern",
      "Uploading...": "Hochladen...",
      //   "Select Language": "Sprache wählen",
      Language: "Sprache",
      "Go to your cart": "Zum Warenkorb",
      "Show Database Data": "Datenbankdaten anzeigen",
      Login: "Anmelden",
      Logout: "Abmelden",
      Signup: "Registrieren",
      "Login Please 😉!": "Bitte anmelden 😉!",
      "Signup Please 😉!": "Bitte registrieren 😉!",
      "Don't have an account?": "Noch kein Konto?",
      "Already have an account?": "Schon ein Konto?",
      "Sign up": "Registrieren",
      "Basket deleted!": "Korb gelöscht!",
      "Basket saved!": "Korb gespeichert!",
      "New basket created": "Neuer Korb erstellt...",
      "No images to display.": "Keine Bilder zum Anzeigen.",
      "All Users & Their Baskets": "Alle Nutzer und ihre Körbe",
      User: "Benutzer",
      "Name:": "Name:",
      "Email:": "E-Mail:",
      "UID:": "UID:",
      "Birthdate:": "Geburtsdatum:",
      "Baskets:": "Körbe:",
      "No baskets.": "Keine Körbe.",
      "Basket ID:": "Korb-ID:",
      "User Email:": "Benutzer-E-Mail:",
      "Items:": "Artikel:",
      "Loading...": "Laden...",
      "Go to Cart": "Zum Warenkorb",
      Close: "Schließen",
      "Enter Password": "Passwort eingeben",
      Password: "Passwort",
      Home: "Startseite",
      Admin: "Admin",
      All: "Alle",
      Biscuits: "Kekse",
      Chocolate: "Schokolade",
      Vegetable: "Gemüse",
      Fruit: "Obst",
      Meat: "Fleisch",
      Dairy: "Milchprodukte",
      Bakery: "Bäckerei",
      Kitchen: "Küche",

      products: {
        1: "Basmati Reis",
        2: "Toor Dal",
        3: "Aashirvaad Mehl",
        4: "Amul Butter",
        5: "Parle-G Kekse",
        6: "Tata Salz",
        7: "Maggi Nudeln",
        8: "Dairy Milk",
        9: "Zwiebel (1kg)",
        10: "Tomate (1kg)",
        11: "Kartoffel (1kg)",
        12: "Banane (1 Dutzend)",
        13: "Apfel (1kg)",
        14: "Orange (1kg)",
        15: "Hähnchen (1kg)",
        16: "Eier (12 Stück)",
        17: "Milch (1 Liter)",
        18: "Zucker (1kg)",
        19: "Tee Pulver (250g)",
        20: "Kaffeepulver (100g)",
        21: "Speiseöl (1 Liter)",
        22: "Salz (1kg)",
        23: "Weizenmehl (1kg)",
        24: "Grüne Erbsen (500g)",
        25: "Korianderblätter (1 Bund)",
        26: "Kreuzkümmelsamen (100g)",
        27: "Chilipulver (100g)",
        28: "Kurkuma Pulver (100g)",
        29: "Ingwer (250g)",
        30: "Knoblauch (250g)",
        31: "Paneer (200g)",
        32: "Joghurt (500g)",
        33: "Zitrone (1kg)",
        34: "Gurke (1kg)",
        35: "Karotte (1kg)",
        36: "Paprika (1kg)",
        37: "Spinat (1 Bund)",
        38: "Blumenkohl (1 Stück)",
        39: "Flaschenkürbis (1kg)",
        40: "Kürbis (1kg)",
        41: "Aubergine (1kg)",
        42: "Mango (1kg)",
        43: "Papaya (1kg)",
        44: "Ananas (1 Stück)",
        45: "Wassermelone (1 Stück)",
        46: "Süßer Mais (1 Stück)",
        47: "Vollkornbrot (1 Laib)",
        48: "Gesalzene Butter (200g)",
        49: "Marmelade (250g)",
        50: "Honig (250g)",
      },
    },
  },
  hi: {
    translation: {
      "No baskets found.": "कोई बास्केट नहीं मिला।",
      "Add Basket": "बास्केट जोड़ें",
      Basket: "बास्केट",
      "Update Basket": "बास्केट अपडेट करें",
      "Save Changes": "परिवर्तन सहेजें",
      "Last updated:": "अंतिम अपडेट:",
      "No items in this basket.": "इस बास्केट में कोई आइटम नहीं है।",
      "Price:": "कीमत:",
      Add: "जोड़ें",
      "Search here...": "यहाँ खोजें...",
      "Log Out": "लॉग आउट",
      Name: "नाम",
      Email: "ईमेल",
      Birthdate: "जन्मतिथि",
      Save: "सहेजें",
      "Change Photo": "फोटो बदलें",
      "Uploading...": "अपलोड हो रहा है...",
      //   "Select Language": "भाषा चुनें",
      Language: "भाषा",
      "Go to your cart": "अपने कार्ट पर जाएं",
      "Show Database Data": "डेटाबेस डेटा दिखाएं",
      Login: "लॉग इन",
      Logout: "लॉग आउट",
      Signup: "साइन अप",
      "Login Please 😉!": "कृपया लॉग इन करें 😉!",
      "Signup Please 😉!": "कृपया साइन अप करें 😉!",
      "Don't have an account?": "खाता नहीं है?",
      "Already have an account?": "पहले से खाता है?",
      "Sign up": "साइन अप करें",
      "Basket deleted!": "बास्केट हटाया गया!",
      "Basket saved!": "बास्केट सहेजा गया!",
      "New basket created": "नया बास्केट बनाया गया...",
      "No images to display.": "दिखाने के लिए कोई चित्र नहीं।",
      "All Users & Their Baskets": "सभी उपयोगकर्ता और उनके बास्केट",
      User: "उपयोगकर्ता",
      "Name:": "नाम:",
      "Email:": "ईमेल:",
      "UID:": "यूआईडी:",
      "Birthdate:": "जन्मतिथि:",
      "Baskets:": "बास्केट:",
      "No baskets.": "कोई बास्केट नहीं।",
      "Basket ID:": "बास्केट आईडी:",
      "User Email:": "उपयोगकर्ता ईमेल:",
      "Items:": "आइटम:",
      "Loading...": "लोड हो रहा है...",
      "Go to Cart": "कार्ट पर जाएं",
      Close: "बंद करें",
      "Enter Password": "पासवर्ड दर्ज करें",
      Password: "पासवर्ड",
      Home: "होम",
      Admin: "एडमिन",
      All: "सभी",
      Biscuits: "बिस्कुट",
      Chocolate: "चॉकलेट",
      Vegetable: "सब्ज़ी",
      Fruit: "फल",
      Meat: "मांस",
      Dairy: "डेयरी",
      Bakery: "बेकरी",
      Kitchen: "रसोई",

      products: {
        1: "बासमती चावल",
        2: "तूर दाल",
        3: "आशिर्वाद आटा",
        4: "अमूल मक्खन",
        5: "पार्ले-जी बिस्कुट",
        6: "टाटा नमक",
        7: "मैगी नूडल्स",
        8: "डेयरी मिल्क",
        9: "प्याज (1किलो)",
        10: "टमाटर (1किलो)",
        11: "आलू (1किलो)",
        12: "केला (1 दर्जन)",
        13: "सेब (1किलो)",
        14: "संतरा (1किलो)",
        15: "चिकन (1किलो)",
        16: "अंडे (12 पीस)",
        17: "दूध (1 लीटर)",
        18: "चीनी (1किलो)",
        19: "चाय पत्ती (250ग्राम)",
        20: "कॉफी पाउडर (100ग्राम)",
        21: "खाना पकाने का तेल (1 लीटर)",
        22: "नमक (1किलो)",
        23: "गेहूं का आटा (1किलो)",
        24: "हरी मटर (500ग्राम)",
        25: "धनिया पत्ते (1 गुट्टी)",
        26: "जीरा (100ग्राम)",
        27: "लाल मिर्च पाउडर (100ग्राम)",
        28: "हल्दी पाउडर (100ग्राम)",
        29: "अदरक (250ग्राम)",
        30: "लहसुन (250ग्राम)",
        31: "पनीर (200ग्राम)",
        32: "दही (500ग्राम)",
        33: "नींबू (1किलो)",
        34: "खीरा (1किलो)",
        35: "गाजर (1किलो)",
        36: "शिमला मिर्च (1किलो)",
        37: "पालक (1 गुट्टी)",
        38: "फूलगोभी (1 टुकड़ा)",
        39: "लौकी (1किलो)",
        40: "कद्दू (1किलो)",
        41: "बैंगन (1किलो)",
        42: "आम (1किलो)",
        43: "पपीता (1किलो)",
        44: "अनानास (1 टुकड़ा)",
        45: "तरबूज (1 टुकड़ा)",
        46: "मीठा मकई (1 टुकड़ा)",
        47: "ब्राउन ब्रेड (1 लोफ)",
        48: "नमकीन मक्खन (200ग्राम)",
        49: "जैम (250ग्राम)",
        50: "शहद (250ग्राम)",
      },
    },
  },
  mr: {
    translation: {
      "No baskets found.": "कोणतेही बास्केट आढळले नाही.",
      "Add Basket": "बास्केट जोडा",
      Basket: "बास्केट",
      "Update Basket": "बास्केट अद्यतनित करा",
      "Save Changes": "बदल जतन करा",
      "Last updated:": "शेवटचे अद्यतन:",
      "No items in this basket.": "या बास्केटमध्ये कोणतेही आयटम नाहीत.",
      "Price:": "किंमत:",
      Add: "जोडा",
      "Search here...": "येथे शोधा...",
      "Log Out": "लॉग आउट",
      Name: "नाव",
      Email: "ईमेल",
      Birthdate: "जन्मतारीख",
      Save: "जतन करा",
      "Change Photo": "फोटो बदला",
      "Uploading...": "अपलोड करत आहे...",
      //   "Select Language": "भाषा निवडा",
      Language: "भाषा",
      "Go to your cart": "तुमच्या कार्टमध्ये जा",
      "Show Database Data": "डेटाबेस डेटा दाखवा",
      Login: "लॉगिन",
      Logout: "लॉगआउट",
      Signup: "नोंदणी करा",
      "Login Please 😉!": "कृपया लॉगिन करा 😉!",
      "Signup Please 😉!": "कृपया नोंदणी करा 😉!",
      "Don't have an account?": "खाते नाही का?",
      "Already have an account?": "आधीच खाते आहे का?",
      "Sign up": "नोंदणी करा",
      "Basket deleted!": "बास्केट हटवला!",
      "Basket saved!": "बास्केट जतन केला!",
      "New basket created": "नवीन बास्केट तयार झाला...",
      "No images to display.": "दाखविण्यासाठी कोणतीही चित्रे नाहीत.",
      "All Users & Their Baskets": "सर्व वापरकर्ते आणि त्यांचे बास्केट",
      User: "वापरकर्ता",
      "Name:": "नाव:",
      "Email:": "ईमेल:",
      "UID:": "यूआयडी:",
      "Birthdate:": "जन्मतारीख:",
      "Baskets:": "बास्केट:",
      "No baskets.": "कोणतेही बास्केट नाहीत.",
      "Basket ID:": "बास्केट आयडी:",
      "User Email:": "वापरकर्त्याचा ईमेल:",
      "Items:": "आयटम:",
      "Loading...": "लोड करत आहे...",
      "Go to Cart": "कार्टमध्ये जा",
      Close: "बंद करा",
      "Enter Password": "पासवर्ड प्रविष्ट करा",
      Password: "पासवर्ड",
      Home: "मुख्यपृष्ठ",
      Admin: "अॅडमिन",
      All: "सर्व",
      Biscuits: "बिस्किटे",
      Chocolate: "चॉकलेट",
      Vegetable: "भाज्या",
      Fruit: "फळे",
      Meat: "मांस",
      Dairy: "दुग्धजन्य पदार्थ",
      Bakery: "बेकरी वस्तू",
      Kitchen: "स्वयंपाकघर",

      products: {
        1: "बसमती तांदूळ",
        2: "तूर डाळ",
        3: "आशिर्वाद पीठ",
        4: "अमूल बटर",
        5: "पार्ले-जी बिस्किट",
        6: "टाटा मीठ",
        7: "माग्गी नूडल्स",
        8: "डेअरी मिल्क",
        9: "कांदा (1किलो)",
        10: "टोमॅटो (1किलो)",
        11: "बटाटे (1किलो)",
        12: "केळी (1 टोपी)",
        13: "सफरचंद (1किलो)",
        14: "संत्रा (1किलो)",
        15: "चिकन (1किलो)",
        16: "अंडी (12 तुकडे)",
        17: "दूध (1 लिटर)",
        18: "साखर (1किलो)",
        19: "चहा पावडर (250ग्राम)",
        20: "कॉफी पावडर (100ग्राम)",
        21: "स्वयंपाक तेल (1 लिटर)",
        22: "मीठ (1किलो)",
        23: "गव्हाचे पीठ (1किलो)",
        24: "शिमगा वाटाणा (500ग्राम)",
        25: "कोथिंबीर पाने (1 गट)",
        26: "जिरे (100ग्राम)",
        27: "तिखट पावडर (100ग्राम)",
        28: "हळद पावडर (100ग्राम)",
        29: "आले (250ग्राम)",
        30: "लसूण (250ग्राम)",
        31: "पनीर (200ग्राम)",
        32: "दही (500ग्राम)",
        33: "लिंबू (1किलो)",
        34: "काकडी (1किलो)",
        35: "गाजर (1किलो)",
        36: "शिमला मिर्च (1किलो)",
        37: "पालक (1 गट)",
        38: "फूलकोबी (1 तुकडा)",
        39: "दोडका (1किलो)",
        40: "भोपळा (1किलो)",
        41: "वांगी (1किलो)",
        42: "आंबा (1किलो)",
        43: "पपई (1किलो)",
        44: "अननस (1 तुकडा)",
        45: "कलिंगड (1 तुकडा)",
        46: "गोड मकई (1 तुकडा)",
        47: "ब्राउन ब्रेड (1 स्लाइस)",
        48: "मीठी लोणी (200ग्राम)",
        49: "जॅम (250ग्राम)",
        50: "मध (250ग्राम)",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ["en", "fr", "de", "hi", "mr", "es"],
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
