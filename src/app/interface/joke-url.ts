export interface JokeURL {
    category: String; 
    flags: {
        'nsfw':Boolean,
        'religious':Boolean,
        'political':Boolean,
        'racist': Boolean, 
        'sexist':Boolean,
        'explicit': Boolean
    }
    type: String, 
    search: String
}
