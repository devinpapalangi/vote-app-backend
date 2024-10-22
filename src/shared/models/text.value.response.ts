export class TextValue {
  text: string;
  value: string;
}

export class TextValueResponse {
  message: string;
  data: TextValue[];
  constructor(message: string, data: TextValue[]) {
    this.message = message;
    this.data = data;
  }
}
