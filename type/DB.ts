export interface DB {
  member: Member[];
  country: Country[];
}

export interface Member {
  id: number;
  name: string;
  nation: string;
}

export interface Country {
  name: string;
  language: string;
}

export const DB_DATAS: DB = {
  member: [
    { id: 1, name: 'Ichiro-Tanaka', nation: 'Japan'   },
    { id: 2, name: 'Ming-Liu',      nation: 'Tiwan'   },
    { id: 3, name: 'Fei',           nation: 'China'   },
    { id: 4, name: 'Jane-Levy',     nation: 'America' },
    { id: 5, name: 'Sangwu-Lee',    nation: 'Korea'   },
    { id: 6, name: 'Tom-Jackson',   nation: 'England' },
    { id: 7, name: 'John-Dow',      nation: 'Gana'    }
  ],
  country: [
    { name: 'America', language: 'English'  },
    { name: 'England', language: 'English'  },
    { name: 'China',   language: 'Chinese'  },
    { name: 'Tiwan',   language: 'Chinese'  },
    { name: 'Korea',   language: 'Korean'   },
    { name: 'Japan',   language: 'Japanese' },
    { name: 'Spain',   language: 'Spanish'  }
  ] 
};