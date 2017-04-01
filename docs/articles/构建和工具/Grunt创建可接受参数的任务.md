
## 创建可接受参数的grunt任务

有的时候，可能需要创建1个通用的任务模板，然后根据执行时传入的不同参数来执行，比如根据参数确认执行哪个文件夹下工程的构建等。
为了达到这个目的，需要解决2个问题：1、调用grunt命令执行函数时参数的传入 2、参数如何影响到task任务的配置项中

- 问题1的解决：
`grunt.registerTask`接受的最后1个参数可以是function，该function的参数即是调用时传入的参数。

- 问题2的解决：
在function内，通过`grunt.config.data`可以访问到我们已经配好的grunt配置。由于该配置是一个Object，也就是说这里是一个地址引用，我们可以去修改这个配置的值。

下面看具体的实现方法：

> // 在initConfig中配置一个copy的任务 
> // 该任务中将文件路径为pkg.simple下的文件，拷贝至pkg.simpleBuild文件目录下 

    copy: {
      simple: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= pkg.simple %>',
            src: '**',
            dest: '<%= pkg.simpleBuild %>'
          }
        ]
      }
    }

> 然后创建simple任务
> 获取grunt.config.data.pkg，根据参数`pathname`的值，修改`pkg.simple`和`pkg.simpleBuild`的值，然后利用`grunt.task.run`执行`clean:simple`任务

    grunt.registerTask('c', 'do simple clean and copy', function(pathname){
        var pkg = grunt.config.data.pkg;
        pkg.simple = pkg.all + '/' + pathname;
        pkg.simpleBuild = pkg.allBuild + '/' + pathname;

        grunt.task.run(['clean:simple', 'copy:simple']);
    });

在cli中，只需要执行`grunt c:pathName`，即可将指定路径：`pkg.all`的子文件夹文件夹`pathName`都拷贝到路径`pkg.allBuild`文件夹下