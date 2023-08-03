-- `student`
create table if not exists `student`
(
    `id`       integer          not null primary key AUTOINCREMENT,
    `name`     varchar(256)     not null,
    `age`      int              null,
    `class_id`    bigint           not null,
    `score`    double default 0 null,
    `exam_num` int    default 0 null
);

insert into `student` (`name`, `age`, `class_id`, `score`, `exam_num`)
values ('鸡哥', 25, 1, 2.5, 1);
insert into `student` (`name`, `age`, `class_id`, `score`, `exam_num`)
values ('鱼皮', 18, 1, 400, 4);
insert into `student` (`name`, `age`, `class_id`, `score`, `exam_num`)
values ('热dog', 40, 2, 600, 4);
insert into `student` (`name`, `age`, `class_id`, `score`, `exam_num`)
values ('摸FISH', null, 2, 360, 4);
insert into `student` (`name`, `age`, `class_id`, `score`, `exam_num`)
values ('李阿巴', 19, 3, 120, 2);
insert into `student` (`name`, `age`, `class_id`, `score`, `exam_num`)
values ('老李', 56, 3, 500, 4);
insert into `student` (`name`, `age`, `class_id`, `score`, `exam_num`)
values ('李变量', 24, 4, 390, 3);
insert into `student` (`name`, `age`, `class_id`, `score`, `exam_num`)
values ('王加瓦', 23, 4, 0, 4);
insert into `student` (`name`, `age`, `class_id`, `score`, `exam_num`)
values ('赵派森', 80, 4, 600, 4);
insert into `student` (`name`, `age`, `class_id`, `score`, `exam_num`)
values ('孙加加', 60, 5, 100.5, 1);