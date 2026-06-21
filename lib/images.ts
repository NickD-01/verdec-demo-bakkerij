const u = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

export const PLACEHOLDER_IMAGE = "/images/placeholder-food.svg";

export const FOOD_IMAGES = {
  // Brood
  witbrood:        u("photo-1509440159596-0249088772ff"),
  bruinbrood:      u("photo-1549931319-a545dcf3bc7b"),
  volkoren:        u("photo-1586444248902-2f64eddc13df"),

  // Viennoiserie
  croissant:       u("photo-1555507036-ab1f4038808a"),
  painChocolat:    u("photo-1549903072-7e6e0bedb7fb"),
  chausson:        u("photo-1621303837174-89787a7d4729"),

  // Gebak
  appeltaart:      u("photo-1562440499-64b9a86bd3f3"),
  eclair:          u("photo-1612929633738-8fe44f7ec841"),
  frambozentaart:  u("photo-1488477181946-6428a0291777"),

  // Sauzen (unused but required by sauces page)
  sauceMayo:       "/images/sauces/mayo.svg",
  sauceTomato:     "/images/sauces/tomato.svg",
  sauceCurry:      "/images/sauces/curry.svg",
  sauceSpicy:      "/images/sauces/spicy.svg",
  sauceGarlic:     "/images/sauces/garlic.svg",
  sauceMustard:    "/images/sauces/mustard.svg",
  saucePickle:     "/images/sauces/pickle.svg",
  sauceCocktail:   "/images/sauces/cocktail.svg",

  // Dranken
  koffie:          u("photo-1509042239860-f550ce710b93"),
  thee:            u("photo-1556679343-c7306c1976bc"),
  water:           u("photo-1616118132534-381148898bb4"),
  cola:            u("photo-1554866585-cd94860890b7"),

  // Hero
  hero: u("photo-1509440159596-0249088772ff"),
} as const;
