package com.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.web.comment.Comment;
import com.web.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // 게시글 ID로 댓글 가져오기
    @GetMapping("/board/{boardSeq}")
    public List<Comment> getCommentsByBoardId(@PathVariable Long boardSeq) {
        return commentService.getCommentsByBoardId(boardSeq);
    }

    // 댓글 생성
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment savedComment = commentService.saveComment(comment);
        return ResponseEntity.ok(savedComment);
    }

    // 댓글 삭제
    @DeleteMapping("/{commentSeq}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentSeq) {
        commentService.deleteComment(commentSeq);
        return ResponseEntity.noContent().build();
    }

    // 댓글 수정
    @PutMapping("/{commentSeq}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long commentSeq, @RequestBody Comment updatedComment) {
        Comment comment = commentService.updateComment(commentSeq, updatedComment);
        return ResponseEntity.ok(comment);
    }
}
