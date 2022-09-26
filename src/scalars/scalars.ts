import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<String, String> {
  description = 'Date custom scalar type';

  parseValue(value: String): String {
    console.log('1');
    return value;
  }

  serialize(value: String): String {
    console.log('2');
    return value; // value sent to the client
  }

  parseLiteral(ast: ValueNode): String {
    console.log(ast);
    console.log(3);
    if (ast.kind === Kind.INT) {
      return ast.kind;
    }
    return null;
  }
}
