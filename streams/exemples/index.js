// This is a simple stream exemple, getting the terminal input and using as output
// process.stdin
//   .pipe(process.stdout)

import { OneToHundredStream } from "./readable";
import { MultiplyByTenStream } from "./writable";
import { InverseNumberStream } from "./transform";

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
