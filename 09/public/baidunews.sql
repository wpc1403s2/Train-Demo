-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-06-10 12:44:13
-- 服务器版本： 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `newsType` char(200) NOT NULL,
  `newsTitle` varchar(200) NOT NULL,
  `newsImg` varchar(200) NOT NULL,
  `newsTime` date NOT NULL,
  `newsSrc` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `newsType`, `newsTitle`, `newsImg`, `newsTime`, `newsSrc`) VALUES
(17, '娱乐', '测试', 'images/02.jpg', '2017-06-09', '00'),
(19, '推荐', '河北拆迁人员砸民宅被扎死', 'images/03.jpg', '2017-06-10', 'test'),
(20, '百家', '河北拆迁人员砸民宅被扎死 行凶者被判防卫过当', 'images/06.jpeg', '2017-06-10', 'test'),
(21, '本地', '被掌控的人类生活：谁主宰了你的“自由决定”', 'images/06.jpeg', '2017-06-10', 'test'),
(22, '推荐', '被掌控的人类生活：谁主宰了你的“自由决定”', 'images/02.jpg', '2017-06-10', 'test'),
(37, '推荐', '习近平出席上合组织成员国会议后回京', 'images/01.jpg', '2017-06-10', '新浪'),
(39, '推荐', '图赏：拥有 6.44 英寸「巨屏」却只售 1699 元的小米 Max 2，你喜欢吗？', 'images/08.jpeg', '2017-06-10', '小米');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
