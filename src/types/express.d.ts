declare global{
    namespace Express{
        interface Request {
            userId?:string;
        }
    }
}

export {}


// this file to solve problem body empty in delete user API