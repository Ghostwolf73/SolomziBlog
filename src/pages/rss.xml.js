import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  return rss({
    title: 'Solomzi — Lab Notes',
    description: 'Networking, cloud, security, and IT support lab notes.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `/blog/${post.slug}/`,
    })),
  });
}