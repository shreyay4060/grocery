const data = [
  {
    id: 1,
    name: "Basmati Rice",
    price: 120,
    image: "https://www.thespruceeats.com/thmb/dcr8sHq3QyEfm2DmmRTK4UZ2uiA=/5184x3456/filters:no_upscale():max_bytes(150000):strip_icc()/basmati-rice-in-a-bowl-with-a-spoon-519309138-7ca58970c0914bb9b117d43cb09d7dd8.jpg",
    type: "rice"
  },
  {
    id: 2,
    name: "Toor Dal",
    price: 90,
    image: "https://img.freepik.com/premium-photo/toor-dal_57665-6546.jpg?w=2000",
    type: "dal"
  },
  {
    id: 3,
    name: "Aashirvaad Atta",
    price: 200,
    image: "https://cdn0.woolworths.media/content/wowproductimages/large/931397.jpg",
    type: "kitchen"
  },
  {
    id: 4,
    name: "Amul Butter",
    price: 55,
    image: "https://th.bing.com/th/id/R.5221bc05d283be08747affe17daffa9b?rik=JMdDe4x%2bv39MTg&riu=http%3a%2f%2fwww.dudhsagardairy.coop%2fwp-content%2fuploads%2f2014%2f04%2f3-Amul-Butter-4.jpg&ehk=iawA3gs9%2fv7md7VwoMg6HA8bf8LuL5xc3YeMt44X6Hg%3d&risl=&pid=ImgRaw&r=0",
    type: "kitchen"
  },
  {
    id: 5,
    name: "Parle-G Biscuits",
    price: 100,
    image: "https://images-cdn.ubuy.co.in/633af64dba25b806c73693ea-parle-g-gold-biscuits-1-kg-10-pack-of.jpg",
    type: "biscuits"
  },
  {
    id: 6,
    name: "Tata Salt",
    price: 25,
    image: "https://m.media-amazon.com/images/I/61AZt0aOGoL._SL1000_.jpg",
    type: "kitchen"
  },
  {
    id: 7,
    name: "Maggi Noodles",
    price: 12,
    image: "https://m.media-amazon.com/images/I/81dpDHc95AL._SL1500_.jpg",
    type: "snacks"
  },
  {
    id: 8,
    name: "Dairy Milk",
    price: 50,
    image: "https://down-ph.img.susercontent.com/file/ph-11134207-7qul1-ljllm48xpt9od3",
    type: "chocolate"
  },
  {
    id: 9,
    name: "Onion (1kg)",
    price: 30,
    image: "https://wallpaperaccess.com/full/1912934.jpg",
    type: "vegetable"
  },
  {
    id: 10,
    name: "Tomato (1kg)",
    price: 40,
    image: "https://images.pexels.com/photos/162830/tomatoes-tomato-harvest-healthy-food-162830.jpeg?cs=srgb&dl=pexels-pixabay-162830.jpg&fm=jpg",
    type: "vegetable"
  },
  {
    id: 11,
    name: "Potato (1kg)",
    price: 25,
    image: "https://th.bing.com/th/id/OIP.fobBf_7eOvyUncD_vGEEDQHaE8?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "vegetable"
  },
  {
    id: 12,
    name: "Britannia Cake",
    price: 60,
    image: "https://rukminim1.flixcart.com/image/416/416/xif0q/cake-pastry/f/m/l/300-delight-1-cake-britannia-original-imagkggzyqynwusw.jpeg?q=70",
    type: "snacks"
  },
  {
    id: 13,
    name: "Nestle Milk",
    price: 45,
    image: "https://d2t3trus7wwxyy.cloudfront.net/catalog/product/n/e/nestle-milk-low-fat-1l_1.jpeg",
    type: "dairy"
  },
  {
    id: 14,
    name: "Green Peas (500g)",
    price: 35,
    image: "https://th.bing.com/th/id/OIP.FTcfoTlFlA7_APAc5jSVIAHaHa?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "vegetable"
  },
  {
    id: 15,
    name: "Choco Delights",
    price: 200,
    image: "https://www.bigbasket.com/media/uploads/p/l/40001690_2-cadbury-5-star-chocolate.jpg",
    type: "chocolate"
  },
  {
    id: 16,
    name: "Black Berry (500g)",
    price: 100,
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    type: "fruit"
  },
  {
    id: 17,
    name: "Paneer (200g)",
    price: 80,
    image: "https://th.bing.com/th/id/OIP.LV1O3JD0bzCtvHfFrLaXqAHaHa?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "dairy"
  },
  {
    id: 18,
    name: "Eggs (12pcs)",
    price: 70,
    image: "https://th.bing.com/th/id/R.cd7e2243c1fb042f7845bbf77a7984ee?rik=%2brZAUx6yrwHBrQ&riu=http%3a%2f%2fwovenmeadows.com%2fwordpress%2fwp-content%2fuploads%2f2012%2f10%2fValdale-Farm-Eggs-1005.jpg&ehk=QkNMILFr84mzl4Qv8%2bVUhpkETzCwTuG72PV5Bj74VAE%3d&risl=1&pid=ImgRaw&r=0",
    type: "dairy"
  },
  {
    id: 19,
    name: "Apple (1kg)",
    price: 120,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80",
    type: "fruit"
  },
  {
    id: 20,
    name: "Banana (1 dozen)",
    price: 50,
    image: "https://th.bing.com/th/id/OIP.qj54xdvjQ1EtRMPN5nglcQHaGl?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "fruit"
  },
  {
    id: 21,
    name: "Orange (1kg)",
    price: 80,
    image: "https://th.bing.com/th/id/R.5b60a84a3bc780be30c11b3ab5599886?rik=b5JiAffcBK%2bNtw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2forange-hd-png-orange-images-orange-hd-wallpaper-and-background-photos-774526-2615.png&ehk=EowHRJ0SIvOz0ZcRJCVKfwWDkZBzo4EcIy1ZVZWMM6c%3d&risl=1&pid=ImgRaw&r=0",
    type: "fruit"
  },
  {
    id: 22,
    name: "Cucumber (500g)",
    price: 25,
    image: "https://th.bing.com/th/id/OIP.VKG1qNp4bQnOTWVzO1DJiwHaEo?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "vegetable"
  },
  {
    id: 23,
    name: "Coca Cola (1L)",
    price: 45,
    image: "https://th.bing.com/th/id/OIP.amD-fqUHOeQ734dEz6--7wHaHa?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "beverage"
  },
  {
    id: 24,
    name: "Pepsi (1L)",
    price: 45,
    image: "https://th.bing.com/th/id/R.00bcee4cde35453b28e45d1cf246fb70?rik=BNLjD5QhLK0xtA&riu=http%3a%2f%2flatfusa.com%2fmedia%2farchive%2f20130325114426Pepsi.jpg&ehk=a6Ifow%2b%2fBf4pZQ%2b%2bx%2f59zOHxHRNQQ1v9leEAKTfyyWs%3d&risl=&pid=ImgRaw&r=0",
    type: "beverage"
  },
  {
    id: 25,
    name: "Sprite (1L)",
    price: 45,
    image: "https://www.tekkabazzar.com/wp-content/uploads/2020/10/Sprite-1.5L.jpg",
    type: "beverage"
  },
  {
    id: 26,
    name: "Lays Chips",
    price: 20,
    image: "https://5.imimg.com/data5/SELLER/Default/2023/5/305943090/DL/VP/QN/116880623/lays-american-cream-and-onion-1000x1000.jpeg",
    type: "snacks"
  },
  {
    id: 27,
    name: "Kurkure",
    price: 20,
    image: "https://m.media-amazon.com/images/I/81NT2IUh9kL._SL1024_.jpg",
    type: "snacks"
  },
  {
    id: 28,
    name: "Good Day Biscuits",
    price: 30,
    image: "https://m.media-amazon.com/images/S/aplus-media/vc/d035a208-fdba-4426-80b6-8857fe238826.__CR0,0,970,600_PT0_SX970_V1___.jpg",
    type: "biscuits"
  },
  {
    id: 29,
    name: "Marie Gold Biscuits",
    price: 25,
    image: "https://www.jiomart.com/images/product/600x600/490332886/britannia-marie-gold-biscuits-68-g-product-images-o490332886-p490332886-0-202208031826.jpg",
    type: "biscuits"
  },
  {
    id: 30,
    name: "Oreo Biscuits",
    price: 35,
    image: "https://i5.walmartimages.com/asr/26f5fb99-376e-4ffe-8165-91022604319d.905ad3fc865453776ad3b750dad01c57.jpeg",
    type: "biscuits"
  },
  {
    id: 31,
    name: "Butter",
    price: 60,
    image: "https://assets.bonappetit.com/photos/6362ed17bc4984693b7b8b30/master/w_1600%2Cc_limit/1101-best-butters-for-baking-kirkland.jpg",
    type: "dairy"
  },
  {
    id: 32,
    name: "Cheese",
    price: 80,
    image: "https://rukminim1.flixcart.com/image/612/612/kl9rssw0/cheese/b/i/y/cheese-spread-yummy-plain-cream-cheese-amul-original-imagyfagkgw5fzuw.jpeg?q=70",
    type: "dairy"
  },
  {
    id: 33,
    name: "Brown Bread",
    price: 40,
    image: "https://static.toiimg.com/photo/90104124.cms",
    type: "bakery"
  },
  {
    id: 34,
    name: "White Bread",
    price: 35,
    image: "https://th.bing.com/th/id/OIP.4fDX4T5b79xh-eBd-0fsIgHaHa?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "bakery"
  },
  {
    id: 35,
    name: "Brown Sugar",
    price: 60,
    image: "https://i5.walmartimages.com/seo/Great-Value-Light-Brown-Sugar-32-oz_07d1a739-5168-48aa-8469-5c9dd80ae574.8fb9eb356db160eb5c7d2cbfb6272e8e.jpeg",
    type: "kitchen"
  },
  {
    id: 36,
    name: "White Sugar",
    price: 50,
    image: "https://th.bing.com/th/id/OIP.hFNuJDjgLHOYioxf29w88AHaE3?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "kitchen"
  },
  {
    id: 37,
    name: "Chana Dal",
    price: 80,
    image: "https://th.bing.com/th/id/OIP.kXIhqRDni4lRDNlgFB5ZWwHaHa?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "dal"
  },
  {
    id: 38,
    name: "Moong Dal",
    price: 90,
    image: "https://th.bing.com/th/id/OIP.jjkyQ8D5bbu7JiHkdu1xnQHaFZ?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "dal"
  },
  {
    id: 39,
    name: "Rajma",
    price: 100,
    image: "https://twobrothersindiashop.com/cdn/shop/articles/benefits-of-rajma.png?v=1691755459&width=1500",
    type: "dal"
  },
  {
    id: 40,
    name: "Chole chana",
    price: 110,
    image: "https://c8.alamy.com/comp/2GGFC66/macro-close-up-of-organic-chhole-chana-or-kabuli-chana-cicer-arietinum-or-whole-white-bengal-gram-dal-on-a-ceramic-black-bowl-top-view-2GGFC66.jpg",
    type: "dal"
  },
  {
    id: 41,
    name: "Cabbage (1kg)",
    price: 30,
    image: "https://th.bing.com/th/id/OIP.HMc3dnWUFqvFtf597vvQ2wHaIF?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "vegetable"
  },
  {
    id: 42,
    name: "Carrot (1kg)",
    price: 40,
    image: "https://th.bing.com/th/id/OIP.h8ISIodUaQRtSBU06KkvPwHaGr?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "vegetable"
  },
  {
    id: 43,
    name: "Capsicum (500g)",
    price: 35,
    image: "https://wallpapercave.com/wp/wp4904287.jpg",
    type: "vegetable"
  },
  {
    id: 44,
    name: "Beans (500g)",
    price: 30,
    image: "https://th.bing.com/th/id/R.08d32daa80e52a5be1e4f4e5f95404ee?rik=s%2brC7%2bBSLcPxEQ&riu=http%3a%2f%2fwww.offthegridnews.com%2fwp-content%2fuploads%2f2016%2f11%2fgreen-beans-public-domain-pictures.jpg&ehk=lfjfuw3yD9fWhu8dS6woeb2Gy5yBViF2fN0wXb7Xu34%3d&risl=&pid=ImgRaw&r=0",
    type: "vegetable"
  },
  {
    id: 45,
    name: "Spinach (1 bunch)",
    price: 20,
    image: "https://th.bing.com/th/id/OIP.u5e85PloAugQmweGBP7W6QHaE8?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "vegetable"
  },
  {
    id: 46,
    name: "Mango Kesar (1kg)",
    price: 150,
    image: "https://aamrai.com/wp-content/uploads/2022/03/GIR-KESAR-.jpg",
    type: "fruit"
  },
  {
    id: 47,
    name: "Pineapple (1pc)",
    price: 80,
    image: "https://aamrai.com/wp-content/uploads/2022/03/GIR-KESAR-.jpg",
    type: "fruit"
  },
  {
    id: 48,
    name: "Watermelon (1pc)",
    price: 60,
    image: "https://th.bing.com/th/id/OIP.kh2qdvKJp89ePy4YFLBeJwHaFj?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "fruit"
  },
  {
    id: 49,
    name: "Grapes (500g)",
    price: 70,
    image: "https://www.southernliving.com/thmb/BBIWYLbK4A5-sNcqzlTjt2kB16Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1061434056-7b173def9dae4e6cb31fc062dbb5f3b6.jpg",
    type: "fruit"
  },
  {
    id: 50,
    name: "Strawberry (250g)",
    price: 90,
    image: "https://th.bing.com/th/id/OIP.zjWrbMltHL5ZG5066J5sAAEyDM?cb=iwc2&rs=1&pid=ImgDetMain",
    type: "fruit"
  }
];

export default data;