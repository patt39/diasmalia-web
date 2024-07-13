import { murmurhash2_x86_32 } from "number-generator";
import queryString from "query-string";
import { v4 as uuidv4 } from "uuid";

export const generateUUID = () => {
  return uuidv4();
};

export const generateNumber = (length: number) => {
  let result = "";

  const generator = murmurhash2_x86_32(`${generateUUID}`);
  const characters = `0123456789${generator}`;
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isNotUndefined = (input: string): boolean =>
  String(input) !== String(undefined) && input.trim() !== "";

export const queyParamsFunc = (payload: any) => queryString.stringify(payload);

export function toURL(title: string) {
  return title
    .toLowerCase()
    .replace(/(\s|'(?=.))/g, "-")
    .replace(/(%|')/g, "")
    .replace(/[àá]/g, "a")
    .replace(/[èé]/g, "e")
    .replace(/[ìí]/g, "i")
    .replace(/[òó]/g, "o")
    .replace(/[ùú]/g, "u");
}
