- 安装inspector
  $ npm install -g node-inspector
- 作为守护程序默认
  $ node-inspector &
- 在运行node程序时，使用下面的命令
  $ supervisor --debug bin/www

- 调试地址
   http://127.0.0.1:8080/debug?port=5858
