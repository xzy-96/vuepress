---

title: dataurl

author: 净垚

date: "2022-06-18"

---

#  什么是 Data URL

Data URL 是将图片转换为 base64 直接嵌入到了网页中，使用`<img src="data:[MIME type];base64"/>`这种方式引用图片，不需要再发请求获取图片。 使用 Data URL 也有一些缺点：

- base64 编码后的图片会比原来的体积大三分之一左右。

- Data URL 形式的图片不会缓存下来，每次访问页面都要被下载一次。可以将 Data URL 写入到 CSS 文件中随着 CSS 被缓存下来。


Data URL 是前缀为`data:`协议的 URL； 它允许内容创建者向文档中嵌入小文件，比如图片等。 Data URL 由四部分组成：

  - 前缀`data:`
  - 指示数据类型的 MIME 类型。例如`image/jpeg`表示 JPEG 图像文件；如果此部分被省略，则默认值为`text/plain;charset=US-SACII`
  - 如果为非文本数据，则可选 base64 做标记
  - 数据

  ```text
  data:[mediatype][;base63], data
  ```