export class HttpResponseDTO<T> {
   protected message: string;

   protected payload: T;

   constructor(payload: T) {
      this.message = 'Berhasil menampilkan data';
      this.payload = payload;
   }
}
