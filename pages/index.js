import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Post from '../components/Post';
import {sortByDate} from '../utils/index';

export default function Home({posts}) {
  // console.log(posts)
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      
      <div className='posts'>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>

    </div>
  )
}

export async function getStaticProps(){
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  // console.log(posts)

  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}