import { Photo } from "./Photo"


export interface Member {
    id: number
    username: string
    nickName: string
    createdOn: Date
    lastActive: Date
    gender: string
    introduction: string
    interests: string
    lookingFor: string
    city: string
    country: string
    photoUrl: string
    photos: Photo[]
    age: number
  }
  
  