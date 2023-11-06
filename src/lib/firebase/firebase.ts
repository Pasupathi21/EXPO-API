import { initializeApp, FirebaseApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { unLinkFile, readFileAsStream, readFileAsBuffer} from '../../utils/handleFiles'


export default class FireBaseService {
  fbApp: FirebaseApp;
  storageInstance!: ReturnType<typeof getStorage>;

  constructor(fbConfig: Record<string, string>) {
    this.fbApp = initializeApp(fbConfig);
    console.log("Firebase initialized");
    // this.fbApp = getApp()
    this.getStorageInstance();
  }

  getStorageInstance(bucketLink?: string) {
    this.storageInstance = getStorage(this.fbApp);
  }

  private async uploadOne(
    object: Record<string, any | unknown>,
    fileType: string
  ) {
    const meta_data = {
      contentType: object?.mimetype,
    };

    return new Promise(
      async (
        resolve: (value: unknown) => void,
        reject: (error: unknown) => void
      ) => {
        try {
          console.log("object?.data?.data", object);
          let hierarchyFolder = `EXPO/`;
          hierarchyFolder +=
            fileType === "VIDEO"
              ? `videos/${object?.filename}`
              : fileType === "AUDIO"
              ? `audios/${object?.filename}`
              : fileType === "IMAGE"
              ? `images/${object?.filename}`
              : `docs/${object?.filename}`;
          const storageRef = ref(this.storageInstance, hierarchyFolder);
        //   const blob = new Blob([], { type: meta_data?.contentType })
          console.log('fiels', typeof  object?.data)
          const fileData = await readFileAsBuffer(object?.path)
          const uploadTask = uploadBytesResumable(
            storageRef,
            fileData,
            meta_data
          );
          uploadTask.on('state_changed', (snap) =>{
            console.log(`Progress completed: ${(snap?.bytesTransferred / snap.totalBytes) * 100}% `)
          }, 
          (error) => {
            console.log('Error', error)
            Promise.reject(error)
          },
          async () => {
            console.log('Successfully uploaded')
            await unLinkFile(object?.path)
            resolve({
              ...uploadTask?.snapshot?.metadata,
              downloadURL: await getDownloadURL(uploadTask?.snapshot?.ref)
            })
          }
          )
        //   uploadTask.on('state_changed', (snap) => {
        //     console.log('Uploaded ...')
        //   }, 
        //   (error) => {
        //     console.log('uploadOne ERROR', error)
        //   },
        //   async () => {
        //     console.log('file successfully uploaded')
        //     resolve(uploadTask.snapshot?.ref);
        //     await unLinkFile(object?.tempFilePath)
        //   })
          // await unLinkFile(object?.path)
          // resolve({ ...uploadTask?.metadata, });
        } catch (e) {
          await unLinkFile(object?.path)
          console.log("ERROR", e);
          reject({
            message: "Upload failed",
          });
        }
      }
    );
  }

  async uploadFile(
    files: Record<string, any | unknown> | Record<string, any | unknown>[],
    fileType: string | "VIDEO" | "AUDIO" | "IMAGE" | "DOC"
  ) {
    try{
      if (!Array.isArray(files)) {
        return await this.uploadOne(files, fileType);
      } else {
        let listOfFileRes = [];
        for (let index = 0; index < files?.length; index++) {
          listOfFileRes.push(await this.uploadOne(files[index], fileType));
        }
        return Promise.resolve(listOfFileRes);
      }
    }catch(error){
      return Promise.reject(error)
    }
    
  }
}
