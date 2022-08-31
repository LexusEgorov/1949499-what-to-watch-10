export type CommentType = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    id: number
    name: string
  }
};

export type Comments = CommentType[];
