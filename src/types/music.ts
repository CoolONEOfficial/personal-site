export class Album {
  constructor(
    public id: String,
    public name: String,
    public type: String,
    public url: String,
    public image: String
  ) {
  }

  static fromMap(map) {
    return new Album(
      map['id'],
      map['name'],
      map['type'],
      map['href'],
      map['images'][0]['url']
    )
  }
}

export class Artist {
  constructor(
    public id: String,
    public name: String,
    public url: String
  ) {
  }

  static fromMap(map) {
    return new Artist(
      map['id'],
      map['name'],
      map['external_urls']['spotify']
    )
  }
}

export class Track {
  constructor(
    public id: String,
    public name: String,
    public previewUrl: String,
    public album: Album,
    public durationMs: number,
    public artists: Artist[],
    public url: String
  ) {
  }

  static fromMap(map) {
    return new Track(
      map['id'],
      map['name'],
      map['preview_url'],
      Album.fromMap(map['album']),
      map['duration_ms'],
      map['artists'].map((mMap) => Artist.fromMap(mMap)),
      map['external_urls']['spotify']
    )
  }
}
