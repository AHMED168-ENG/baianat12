import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import * as fs from 'fs/promises';
import { HttpException, HttpStatus } from '@nestjs/common';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

@Resolver()
export class uploadFile {
  constructor() {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args('file', { type: () => [GraphQLUpload] }) file: FileUpload[],
  ): Promise<boolean> {
    file.forEach(async (ele) => {
      ele = await ele;
      const { createReadStream } = await ele;
      const stream = createReadStream();
      let chunks = [];

      var buffer = await new Promise<Buffer>((resolve, reject) => {
        let buffer: Buffer;

        stream.on('data', function (chunk) {
          return chunks.push(chunk);
        });

        stream.on('end', function () {
          buffer = Buffer.concat(chunks);
          resolve(buffer);
        });

        stream.on('error', reject);
      });

      await fs
        .writeFile('./src/public/' + (await ele.filename), buffer)
        .catch((error) => {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        })
        .then(async (val) => {
          const files = await imagemin(['./src/public/' + ele.filename], {
            destination: 'build/images',
            plugins: [
              imageminJpegtran(),
              imageminPngquant({
                quality: [0.6, 0.8],
              }),
            ],
          });
          console.log(files);
        });
    });
    return true;

    // return new Promise(async (resolve, reject) =>
    //   createReadStream()
    //     .pipe(
    //       createWriteStream(
    //         `./src/public/${Math.random() * 10 + file.filename}`,
    //       ),
    //     )
    //     .on('finish', (res) => {
    //       resolve(true);
    //     })
    //     .on('error', (error) => {
    //       reject(false);
    //     }),
    // );
  }
}
