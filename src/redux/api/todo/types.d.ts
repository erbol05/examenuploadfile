namespace TIMER {
  interface ITodos {
    _id?: number;
    title: string;
    year: string;
    img: string;
  }

  type postRes = ITodos[];
  type postReq = ITodos;

  type getRes = ITodos[];
  type getReq = void;

  type editRes = ITodos[];
  type editReq = { id: number; data: ITodos };

  type deleteRes = ITodos[];
  type deleteReq = number | undefined;
}
