# disassembler-intel-x86
A js dissassembler for x86 intel opCodes. Supports only limited amount of instructions currently, feel free to contribute!

# Usage
Import the `Disassembler` class and call 

``` 
new Disassembler().generateInstructions(code: string) \\ returns Instruction[]

interface operand {
  value?: string;
  register?: string;
  register2?: string;
  displacement?: string;
  constant?: string;
  pointer?: pointerType;
}

interface Instruction {
  instruction: string;
  operand1?: operand;
  operand2?: operand;
  position?: number;
}

```
