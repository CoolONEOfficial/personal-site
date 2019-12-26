export class Album {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public url: string,
    public image: string
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
    public id: string,
    public name: string,
    public url: string
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
    public id: string,
    public name: string,
    public previewUrl: string,
    public album: Album,
    public durationMs: number,
    public artists: Artist[],
    public url: string
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
