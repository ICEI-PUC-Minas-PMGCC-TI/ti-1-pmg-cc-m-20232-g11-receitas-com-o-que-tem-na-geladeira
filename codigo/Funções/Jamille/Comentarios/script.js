document.addEventListener("DOMContentLoaded", function() {
    const commentsContainer = document.getElementById("comments");
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");

    commentForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const commentText = commentInput.value;
        if (commentText.trim() === "") {
            return; // Evita comentários em branco
        }

        const commentTime = new Date().toLocaleString(); // Obtém a hora atual

        const commentElement = document.createElement("div");
        commentElement.innerHTML = `
        <div class="posts">
          <div class="infoUserPost">
                        <div class="imgUserPost"></div>
    
                        <div class="nameAndHour">
                            <strong class="user2">User</strong>
                            <p class="time">${commentTime}</p>
                        </div>
                    </div>
    
                    <p>
                      ${commentText}
                    </p>
    
                    <div class="actionBtnPost">
                        <button type="button" class="filesPost like"><img src="icon/heart.svg" alt="Curtir">Curtir</button>
                        <button type="button" class="filesPost comment"><img src="icon/comment.svg" alt="Comentar">Comentar</button>
                    </div>
        </div>
        `;
        commentsContainer.appendChild(commentElement);

        commentInput.value = ""; // Limpa o campo de entrada
    });
});
