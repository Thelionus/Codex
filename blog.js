// Blog posts data - Add new posts here
const blogPosts = [
    {
        title: "Welcome to My Blog",
        date: "January 21, 2026",
        content: `
            <p>Welcome to my blog where I share thoughts on cognitive engineering, music, technology, and the intersection of art and science.</p>
            <p>Throughout my career as a jazz pianist and cognitive engineering researcher, I've explored how the mind processes complex patterns, whether in music or in human-computer interaction. This blog will be a space to share insights, stories, and reflections on these topics.</p>
            <p>Stay tuned for posts about jazz theory, performance experiences, cognitive science, and the creative process.</p>
        `
    },
    {
        title: "The Intersection of Jazz and Cognitive Engineering",
        date: "January 15, 2026",
        content: `
            <p>Jazz improvisation and cognitive engineering share more in common than one might think. Both require real-time processing, pattern recognition, and adaptive decision-making under uncertainty.</p>
            <p>When I'm performing, my mind is constantly evaluating harmonic possibilities, rhythmic variations, and melodic developments. This is remarkably similar to how we design systems that must adapt to user behavior in real-time.</p>
            <p>The principles of anticipation, feedback loops, and contextual awareness apply equally to both domains. Understanding one has deepened my appreciation and skill in the other.</p>
        `
    }
];

// Function to render blog posts
function renderBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');

    if (!blogContainer) {
        console.error('Blog container not found');
        return;
    }

    // Clear existing content
    blogContainer.innerHTML = '';

    // Render each blog post
    blogPosts.forEach((post, index) => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';

        postElement.innerHTML = `
            <h2><a href="#post-${index}">${post.title}</a></h2>
            <div class="blog-meta">${post.date}</div>
            ${post.content}
        `;

        blogContainer.appendChild(postElement);
    });
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', renderBlogPosts);
