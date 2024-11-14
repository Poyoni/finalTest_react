export interface Candidate {
    _id: string;
    name: string;
    image: string;
    votes: number;
}


export interface User {
    username: string;
    password: string;
    organization: string;
    region?: string;
}

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';