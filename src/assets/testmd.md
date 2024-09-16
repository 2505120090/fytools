# 测试标题1
## 测试标题2
### 测试标题3
![粘贴的图片](https://fytools.oss-cn-hangzhou.aliyuncs.com/1726420576_20240406141321.jpg)
1. 测试序号1
2. 测试序号2
   2.1 dasda
   2.2 sadsad

- 112e1
  - 21e12
    - DWASDSA
      - DASASD
        - QDSA
       

> 测试引用


测试代码块JAVA
```java
package disruptor;

import com.lmax.disruptor.BlockingWaitStrategy;
import com.lmax.disruptor.EventFactory;
import com.lmax.disruptor.EventHandler;
import com.lmax.disruptor.RingBuffer;
import com.lmax.disruptor.dsl.Disruptor;
import com.lmax.disruptor.dsl.ProducerType;

import java.util.concurrent.ThreadFactory;

public class DisruptorMain
{
    public static void main(String[] args) throws Exception
    {
        // 队列中的元素
        class Element {

            private int value;

            public int get(){
                return value;
            }

            public void set(int value){
                this.value= value;
            }

        }

        // 生产者的线程工厂
        ThreadFactory threadFactory = new ThreadFactory(){
            @Override
            public Thread newThread(Runnable r) {
                return new Thread(r, "simpleThread");
            }
        };

        // RingBuffer生产工厂,初始化RingBuffer的时候使用
        EventFactory<Element> factory = new EventFactory<Element>() {
            @Override
            public Element newInstance() {
                return new Element();
            }
        };

        // 处理Event的handler
        EventHandler<Element> handler = new EventHandler<Element>(){
            @Override
            public void onEvent(Element element, long sequence, boolean endOfBatch)
            {
                System.out.println("Element: " + element.get() +",seq:" + sequence);
                // 如果这是批次的最后一个事件，打印提示
                if (endOfBatch) {
                    System.out.println("End of current batch");
                }
            }
        };

        // 阻塞策略
        BlockingWaitStrategy strategy = new BlockingWaitStrategy();

        // 指定RingBuffer的大小
        int bufferSize = 16;

        // 创建disruptor，采用单生产者模式
        Disruptor<Element> disruptor = new Disruptor(factory, bufferSize, threadFactory, ProducerType.SINGLE, strategy);

        // 设置EventHandler
        disruptor.handleEventsWith(handler);

        // 启动disruptor的线程
        disruptor.start();

        RingBuffer<Element> ringBuffer = disruptor.getRingBuffer();

        for (int l = 0; true; l++)
        {
            // 获取下一个可用位置的下标
            long sequence = ringBuffer.next();  
            try
            {
                // 返回可用位置的元素
                Element event = ringBuffer.get(sequence); 
                // 设置该位置元素的值
                event.set(l); 
            }
            finally
            {
                ringBuffer.publish(sequence);
            }
            Thread.sleep(10);
        }
    }
}
```
 
测试代码块python
```python
import time

from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS

import oss2
import os
from config import OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, OSS_BUCKET_NAME, OSS_ENDPOINT
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # 允许所有域名访问，生产环境下可以配置成指定的域名

# 初始化 OSS 认证
auth = oss2.Auth(OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET)
bucket = oss2.Bucket(auth, OSS_ENDPOINT, OSS_BUCKET_NAME)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')

# 上传文件的路由
@app.route('/')
def index():
    return render_template('upload.html')

```



