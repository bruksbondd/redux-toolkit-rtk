import {IPost} from "../models/IPost";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], number>({
            query: (limit: number = 5) => ({
                url: `/posts`,
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['Post']
        }),
        createPost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post']
        }),
    })
})