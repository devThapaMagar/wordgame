import Head from 'next/head';

import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
    debugger;
    return (
        <div>
            <Head>
                <script src="https://sites.local/api/script" async defer></script>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {posts.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    // get the current environment
    let dev = process.env.NODE_ENV !== 'production';
    let { DEV_URL, PROD_URL } = process.env;

    const server = dev ? DEV_URL : PROD_URL;

    // request posts from api
    let response = await fetch(`${server}/api/posts`);
    // extract the data
    let data = await response.json();
    return {
        props: {
            posts: data['message'],
        },
    };
}