package com.web.comment;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.web.board.Board;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_seq")
    @SequenceGenerator(name = "comment_seq", sequenceName = "comment_seq", allocationSize = 1)
    private Long commentSeq;

    @Column(name = "comment_content", nullable = false)
    private String commentContent;

    @Column(name = "comment_author", nullable = false)
    private String commentAuthor;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "comment_date", nullable = false)
    private Date commentDate = new Date();

    @ManyToOne
    @JoinColumn(name = "board_seq", nullable = false)
    @JsonBackReference
    private Board board;
}

