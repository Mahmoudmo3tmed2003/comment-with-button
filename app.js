
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
      const postsContainer = document.getElementById('posts-container');

      posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('col-md-4', 'mb-4');

        const postCard = `
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">${post.title}</h2>
              <p class="card-text">${post.body}</p>
              <button class="btn btn-primary toggle-comments" data-post-id="${post.id}">Show Comments</button>
              <div class="comments-container" id="comments-${post.id}" style="display: none;"></div>
            </div>
          </div>
        `;

        postDiv.innerHTML = postCard;
        postsContainer.appendChild(postDiv);
      });

      document.querySelectorAll('.toggle-comments').forEach(button => {
        button.addEventListener('click', function() {
          const postId = this.getAttribute('data-post-id');
          const commentsContainer = document.getElementById(`comments-${postId}`);

          if (commentsContainer.style.display === 'none') {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
              .then(response => response.json())
              .then(comments => {
                commentsContainer.innerHTML = comments.map(comment => `
                  <div class="comment">
                    <h5>${comment.name}</h5>
                    <p>${comment.body}</p>
                    <small>${comment.email}</small>
                  </div>
                `).join('');
                commentsContainer.style.display = 'block';
                this.textContent = 'Hide Comments';
              })
              .catch(error => console.error('Error fetching comments:', error));
          } else {
            commentsContainer.style.display = 'none';
            commentsContainer.innerHTML = '';
            this.textContent = 'Show Comments';
          }
        });
      });
    })
    .catch(error => console.error('Error fetching posts:', error));
}); 

