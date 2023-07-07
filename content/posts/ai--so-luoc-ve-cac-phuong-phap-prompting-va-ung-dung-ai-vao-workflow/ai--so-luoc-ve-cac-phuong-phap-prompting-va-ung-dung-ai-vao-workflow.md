+++
title = "AI: Sơ lược về các phương pháp Prompting và Ứng dụng AI vào workflow"
author = ["Chop Tr (chop.dev)"]
description = "Trong video trước mình có đi tìm hiểu qua và trình bày về AI. Thì tháng vừa qua mình cũng đã làm được 1 số ứng dụng kha khá và áp dụng AI vào trong công việc hằng ngày. Video này sẽ chia sẻ ứng dụng mà mình đã thực hiện và những bài học về cách thức sử dụng AI. Đặc biệt là về các phương pháp Prompting."
date = 2023-07-05T00:00:00+07:00
tags = ["ai", "openai", "chatgpt", "prompting", "engineer", "application", "information", "document", "extractor", "video", "script", "chain of thought", "cot", "react", "reasoning and action"]
draft = false
cover = "/posts/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow-9.jpg"
+++

# Video

[https://www.youtube.com/watch?v=Rj0T4bPRGFM](https://www.youtube.com/watch?v=Rj0T4bPRGFM)

# Intro

Xin chào các bạn. Chop trở lại với một video mới. Video lần này là về AI viết tắt của Artificial Intelligence - Trí tuệ nhân tạo.

Trong video trước mình có đi tìm hiểu qua và trình bày sơ qua về AI, về mô hình Transformer và demo thử 1 cái app Document Chat nhỏ nhỏ.

Thì trong 2 tháng vừa qua sau khi thực hiện video đó thì mình cũng đã nhúng tay xử lý một số tác vụ liên quan đến AI và học được nhiều thứ. Làm được 1 cái ứng dụng nho nhỏ và áp dụng được AI vào trong workflow hằng ngày.

Video này mình sẽ tổng hợp lại những bài học về cách thức sử dụng AI trong các ứng dụng mà mình đã thực hiện.

Thì các kiến thức cùng trải nghiệm cũng khá nhiều chắc không gom hết vào 1 video được trước tiên sẽ tập trung giới thiệu qua về các phương pháp Prompting trước.

Cuối video mình sẽ chia sẻ một công cụ mà mình đã thực hiện và phân tích trải nghiệm sử dụng AI cũng như hạn chế trong quá trình sử dụng.

# Thì đầu tiên Prompting là gì?

Prompting là một phương pháp được sử dụng trong lĩnh vực trí tuệ nhân tạo để tạo ra các câu hỏi hoặc yêu cầu dữ liệu từ hệ thống AI.

Prompting có thể được coi như một dạng gợi ý hoặc hướng dẫn cho hệ thống AI, giúp nó tạo ra các câu trả lời phù hợp với mục đích của người dùng.

Kỹ thuật này thường được sử dụng trong các lĩnh vực xử lý ngôn ngữ tự nhiên. Nhưng nó không bị giới hạn chỉ sử dụng cho các LLM. 

Các ứng dụng về hình ảnh như với Stable Diffusion cũng cần thiết kế các câu prompt để đạt được các hình ảnh đẹp.

## Prompt Engineer

Ok thì để prompt AI chúng ta có 1 khái niệm là Prompt Engineer.

Thì như các bạn biết chúng ta hiện chỉ mới ở trong giai đoạn đầu của các hệ thống ứng dụng AI.

Và nếu các bạn trải nghiệm thử các AI thì sẽ thấy chúng thường gặp khó khăn trong việc hiểu và đáp ứng đúng các yêu cầu từ người dùng.

Đó là lúc mà prompt engineers (hay còn gọi là kỹ sư tạo thiết kế yêu cầu) có vai trò quan trọng trong việc tạo ra các câu prompt giúp các hệ thống AI đưa ra các câu trả lời chính xác hơn và đúng mục đích hơn.

Các kỹ sư Prompt Engineer sẽ hiểu chuyên sâu về các Large Language Models họ đang sử dụng để tạo các câu prompt phức tạp, nhằm tăng cường khả năng hiểu và đáp ứng của hệ thống AI.

## Chain of Thought with ReAct

### Chain of Thought

Một trong những kỹ thuật phổ biến được sử dụng bởi prompt engineers là Chain of Thought.

Kỹ thuật này liên quan đến việc tạo ra một chuỗi các câu hỏi hoặc yêu cầu dữ liệu liên quan đến vấn đề cần giải quyết.

Trong các chuỗi câu hỏi và trả lời này là những mẫu giải quyết vấn đề theo từng bước. Tương tự như con người suy nghĩ về các vấn đề.

Giúp cho AI hiểu và tiếp cận vấn đề theo lối suy luận và giải quyết vấn đề. Nhằm cải thiện chất lượng của câu trả lời.

Thì các phương pháp prompting CoT có thể được phân loại thành nhiều mô hình. Mình sẽ đi từ đơn giản đến phức tạp.

Sau đây mình trích tài liệu

AUTOMATIC CHAIN OF THOUGHT PROMPTING IN LARGE LANGUAGE MODELS

xuất bản tháng 10/2022

[https://arxiv.org/abs/2210.03493](https://arxiv.org/abs/2210.03493)

![](/posts/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow-0.jpg)

#### Zero-Shot-CoT

Đầu tiên là Zero-Shot prompting.

Mô hình này thêm một câu prompt duy nhất như "Let's think step by step" sau câu hỏi để tạo điều kiện trigger cho chuỗi suy luận trong LLMs. 

Khi được trigger bằng câu này thì AI nó sẽ xử lý bằng cách hoàn thành câu bằng một chuỗi suy luận.

Như trong hình lấy ví dụ là một bài toán nhỏ để mô phỏng. Tính số lượng chuồng cho các chú chó con puppies. Kết quả là đưa ra chính xác là 9.

Các LLMs xử lý kiểu Zero-shot-CoT này cũng đã có phần cải thiện rất nhiều trong độ chính xác của câu trả lời.

Các bạn có thể thử với ChatGPT để so sánh việc prompt có câu trigger "Let's think step by step" này ngay để xem câu trả lời được cải thiện nhiều không ha.

#### Manual-CoT

Mô hình này là phương pháp prompting sử dụng nhiều bước với các mẫu suy luận. Mỗi mẫu suy luận trong prompt bao gồm một câu hỏi và một chuỗi suy luận.

Chuỗi suy luận gồm một loạt các bước suy luận trung gian - Rationale - và một câu trả lời.

Trong hình này thì cũng chung một vấn đề tính số lượng chuồng cho puppies.

Thì trong câu prompt, chúng ta có một câu hỏi tương tự cũng giải quyết vấn đề tính toán. Là tính số lượng cây được trồng. Cho rằng tổng số cây sau khi trồng là 21 và số cây có sẵn trước đó là 15. Thì bài toán đơn giản thôi 21 - 15 là 6.

Việc có mẫu này sẽ làm cho AI hiểu cách xử lý và đưa ra câu trả lời dựa trên mẫu suy luận trên.

Trong này thì prompt engineer bắt đầu bẻ lái các hành vi của AI nhiều hơn.

Với cách thức demo mẫu và làm theo này thì chúng ta có thể đóng khuôn câu trả lời tốt hơn do AI có mẫu để làm theo.

#### Automatic-CoT

Trong tài liệu này thì có trình bày một phương pháp prompting CoT nữa là Automatic Chain of Thought.

Phương pháp này xây dựng các mẫu prompt với câu hỏi và chuỗi lý luận một cách tự động. Auto-CoT bao gồm hai giai đoạn chính: phân cụm câu hỏi và lấy mẫu câu.

Giai đoạn phân cụm câu hỏi liên quan đến việc chia các câu hỏi của tập dữ liệu thành một số cụm nhỏ. Mục đích của giai đoạn này là nhóm các câu hỏi có cùng chủ đề hoặc nội dung tương tự lại với nhau. Việc phân cụm câu hỏi giúp  tự động tạo và tổ chức cấu trúc mẫu câu.

Tiếp theo để sử dụng thì là lấy mẫu liên quan đến câu hỏi của người dùng từ mỗi cụm và tạo ra chuỗi lý luận. Và sử dụng Zero-Shot-CoT ở trên với trigger "Let's think step by step" để làm mẫu.

Tổng quan về phương pháp Auto-CoT là nó giúp tự động xây dựng các mẫu câu với câu hỏi và chuỗi lý luận dựa trên việc phân cụm các mẫu câu sau đó tìm kiếm các mẫu liên quan để sử dụng cho câu prompt.

![](/posts/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow-1.jpg)

Ok thì như trong hình này các bạn có thể thấy là chúng ta có thể có nhiều mẫu câu hỏi và trả lời được generate ra trước. Và việc generate này đương nhiên có thể được tự động hoá, automatic.

Sau đó khi lên kế hoạch prompting, xử lý câu hỏi của người dùng. Chúng ta sẽ tìm kiếm theo dạng vector similarity để lấy ra các câu prompt mẫu gần với nội dung của câu hỏi người dùng nhất.

Ví dụ người dùng hỏi về nấu ăn cooking đi. Thì chúng ta sẽ prompt mẫu là các câu hỏi và trả lời liên quan đến nấu ăn.

Và với phương pháp này câu trả lời của AI hay LLM sẽ có chất lượng tốt hơn và chính xác hơn nhiều.

#### Plan and Solve (PS-CoT)

Tiếp theo là một tài liệu mới được công bố tháng 5/2023 này thôi. Mình cũng chưa có cơ hội áp dụng nhiều lắm.

Tài liệu tên là

Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models

[https://arxiv.org/abs/2305.04091](https://arxiv.org/abs/2305.04091)

Do một nhóm nghiên cứu của đại học Singapore và China phát hành.

Theo mình tìm hiểu thì nó thì Plan and Solve này là nó đưa ra một mô hình phức tạp hơn là trước khi xử lý vấn đề, AI sẽ phải tạo ra một kế hoạch và tạo ra quá trình suy luận trung gian trước khi xử lý câu trả lời cuối cùng.

Một điểm đặc biệt là phương pháp này không đòi hỏi các ví dụ minh họa như trong Few-shot prompting.

Prompt của phương pháp này bao gồm vấn đề cùng với một câu kích hoạt.

"Let's first understand the problem…"

Quá trình Plan and Solve bao gồm hai bước: tạo ra quá trình hiểu và lên kế hoạch Planning á. Và sau đó mới tiếp tục câu trả lời - Solution.

Nghe thì cũng không khác mấy ha. Điểm đặc biệt ở đây là quá trình Planning, hay lên kế hoạch.

Trong câu prompt này có cái phrase để trigger việc lên kế hoạch này là "devise a plan" và "carry out the plan".

Dẫn đến việc AI sẽ có xu hướng tạo ra một kế hoạch cụ thể để xử lý vấn đề trước thay vì xử lý theo mẫu như các phương pháp prompting trên.

![](/posts/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow-2.jpg)

Cải tiến hơn nữa thì có phương pháp Plan and Solve Plus. Tạm gọi PS+.

Phương pháp PS+ là một chiến lược prompting thêm các hướng dẫn để trích xuất các biến - variables - liên quan và các giá trị tương ứng của chúng.

![](/posts/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow-3.jpg)

Trong hình này là mẫu tính toán bình thường thôi. Grace nặng 125 pounds, Alex nặng thấp hơn 2 pounds cân nặng của Alex. Tính ra là Alex nặng 498 pounds là tới 225kg lận hơi khi khủng mà thôi cho qua :D

Lưu ý là với phương pháp prompting PS+ này sử dụng phrase trigger là "extract relevant variables and their corresponding numerals" thì AI nó có thể trích xuất ra được giá trị cân nặng của Grace và Alex như trong hình dẫn tới kết quả và suy luận được chính xác hơn.

Chiến lược PS+ có thể được tùy chỉnh để giải quyết các vấn đề khác ngoài vấn đề tính toán.

Các bạn có thể hình dung xa hơn về việc extract thông tin trong vấn đề của người dùng. Như giải quyết các trường hợp liên quan đến thông tin hợp đồng.

Cần extract thông tin về các bên hoàn cảnh đang được nói tới  v.v

Ok thì phương pháp này tìm hiểu vậy thôi chứ cũng hơi cutting edge. Mình chưa nhúng tay thử thực tế nên không dám chém xa.

### ReAct

Rồi thì khái niệm tiếp theo là ReAct.

Thì ReAct, viết kết hợp Reasoning - tư duy và Action - hành động, là một khái niệm hay thường được sử dụng chung với Chain of Thought.

Nó là ý tưởng mà tạo ra một chuỗi các câu hỏi hoặc yêu cầu dữ liệu liên quan bằng cách kết hợp cả tư duy và hành động vào một process hoạt động.

Với ReACT, mục tiêu không chỉ là đặt câu hỏi cho hệ thống AI một loạt câu hỏi, mà còn là hướng dẫn nó suy luận thông qua việc nhận biết thông tin và thực hiện việc hành động hoặc sử dụng các công cụ phù hợp dựa trên suy luận đó.

Phương pháp này cho phép hệ thống AI giải quyết vấn đề phức tạp hơn nữa qua việc có thể đưa cho nó các thông tin từ bên ngoài thông qua khái niệm công cụ - Tools.

Ở đây mình trích tài liệu

REACT: SYNERGIZING REASONING AND ACTING IN LANGUAGE MODELS

Tài liệu được xuất bản của các nhà nghiên cứu ở Google Research và trường đại học Princeton.

Xuất bản tháng 10 2022. Sửa đổi tháng 3 2023.

[https://arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629)

Trong đoạn Intro của tài liệu này đưa ra một ví dụ về việc nấu một món ăn trong nhà bếp.

Để hình dung quá trình nấu ăn, chúng ta thử sử dụng ngôn ngữ để mô tả tiến trình. Ví dụ như sau ha.

("now that everything is cut, I should heat up the pot of water")

("bây giờ mọi thứ đã được cắt, tôi nên đun nóng nồi nước"),

Ok rồi cần xử lý các trường hợp và điều chỉnh kế hoạch theo tình huống

("I don’t have salt, so let me use soy sauce and pepper instead")

("Tôi không có muối, vì vậy sẽ dùng nước tương và tiêu thay thế"),

và nếu cần có thể nhận thông tin external - là thông tin từ bên ngoài như từ Internet.

("How do I prepare dough? Let me search on the Internet")

("làm thế nào để chuẩn bị bột? Hãy tìm kiếm trên Internet").

Và chúng ta có thể thiết kế để xử lý luồng "tư duy" này của AI. Cung cấp cho nó các thông tin nó cần bằng cách lập trình lên chương trình parse các luồng suy nghĩ này rồi thực hiện các API call để bổ xung thông tin cho AI.

Với việc hiểu được Tools - hay công cụ cần dùng để giải quyết vấn đề. Mở ra cho AI một khối lượng thông tin mới. Không còn bị giới hạn bởi thông tin mà nó có trong quá trình training nữa.

# Công cụ nghiên cứu và soạn script video

Ok thì trên là các cái khái niệm về prompting cho AI. Thì như nói ở trên mình cũng áp dụng những kiến thức này vào việc lập trình và viết 1 cái app nho nhỏ để sử dụng.

Chủ yếu là xử lý quá trình mình tạo ra 1 video mới.

## Introduction

Thì bạn nào làm video sẽ biết. Để tạo ra 1 video thì nội dung hay content của nó là việc khá là quan trọng.

Nội dung hay sẽ thu hút và giữ chân người xem. Nếu nội dung không hấp dẫn, khán giả có thể sẽ không tiếp tục xem video.

Để tạo ra một nội dung hay, bạn cần có ý tưởng. Và để lên ý tưởng thì việc nghiên cứu research thông tin là một phần quan trọng.

Thì cái tool mà mình làm dùng AI để hỗ trợ mình trong quá trình nghiên cứu thông tin này.

## How to use

OK, thì như các bạn cũng biết Youtube là một kho content cực kì lớn. Thực sự là trong vài năm gần đây, việc học của mình phần lớn là dựa vào các video trên Youtube.

Mình được feed thông tin liên tục về mảng mà mình đang tìm hiểu. Sau đó mình mới bắt đầu thử nghiệm các kiến thức và trau dồi thêm bằng các ứng dụng thực tế.

Thì trong App này mình có chức năng để kéo các transcript của video về.

Đưa vào cho nó 1 cái Youtube Video Link, nó sẽ tự động kéo transcript về.

Transcript là bảng phiên âm của Video. Thường các bạn có thể bật nó lên bằng cách bật subtitle cho Video vậy.

Ở đây thì mình chỉ tập trung process tiếng Anh thôi chứ chưa xử lý các ngôn ngữ khác ha.

![](/posts/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow-4.jpg)

Rồi thì những transcript này khá là thô. Kéo về thì nó không có dấu chấm phẩy gì đâu. Thì mình dùng AI để parse các đoạn text thô này, thêm dấu chấm phẩy để làm thành tài liệu cho các công cụ tiếp theo.

Ok ở đây thì các bạn cũng thấy 2 nút. Nút play và nút cộng. Nút play là để mình mở một cửa sổ Youtube để mình xem lại video xem đoạn script này là ở khúc nào trong Video.

Xem thì sẽ hiểu được nhiều hơn vì Video sẽ có hình ảnh minh hoạ.

Nút Cộng là sẽ thêm Nội dung này vào 1 cái Scratch Pad. Các bạn có thể hiểu nó như quyển sổ Ghi chú của AI vậy đó.

Và nó có liên quan đến Chain Of Thought. Tiếp theo mình sẽ quay lại giải thích chỗ này.

Chúng ta có thể xem tiếp phần Similarity Search.

![](/posts/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow-5.jpg)

OK trong này sẽ là Quá trình xử lý bằng Vector Database.

Vector Database thì mình cũng đề cập sơ ở Video trước trong cái tool thử nghiệm "Document Chat Bot".

Vector Database cũng không có gì khó hiểu, nó là 1 cái công cụ để thực hiện Semantic Search thôi.

Tức là search với nội dung tương tự chứ không phải search chính xác. Bạn nào xài Elasticsearch hay Anglia thì cũng không quá lạ lẫm.

OK thì mình có thể thực hiện việc search ở đây. Ví dụ "prompt engineer" ha.

Thì cái nguồn search là các video mà mình đang chọn ở đây. Chủ yếu là video về AI, Tools, Agent, Prompting và về sử dụng Langchain.

Kết quả là các đoạn script mà liên quan đến cái term "prompt engineer" ha.

OK thì với các đoạn script này mình có thể tham khảo lại bằng Youtube Play nè.

Và với nội dung phù hợp cũng có thể add nó vào Scratch Pad để dành làm note ghi chú.

OK. Rồi với Scratch Pad này thì có thêm chức năng gì?

Đó là 2 chức năng: Format và Extract.

![](/posts/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow-6.jpg)

Chức năng Format này thì là optional thôi, mình muốn xử lý format lại các đoạn văn cho hợp lý.

Vì đối với AI, việc xuống hàng hoặc kể cả dấu câu cũng góp phần lớn trong quá trình xử lý thông tin của nó. Nên chức năng này cũng góp phần cho việc tạo nên một câu prompt hiệu quả.

Rồi và sau khi format đẹp đẽ thì việc tiếp theo là Extract information từ trong văn bản đó ra.

Extract Information mình dùng AI để liệt kê ra các nội dung mà mình cần chuyển hoá văn bản này thành dạng cô độn hơn. Ở đây là để nhét nội dung vào trong câu prompt cuối.

Giới hạn của các LLMs là cái context window. Hiện OpenAI ChatGPT 3.5 có context window là khoản 4000 tokens thôi.

Lượng 4000 token này là gồm cả token câu prompt và token cho câu trả lời. Nên việc rút gọn thông tin trong câu prompt sẽ chừa nhiều chỗ hơn cho câu trả lời được generate ra.

OK và cuối cùng thì chức năng của tool này là gì?

Là bên Tab Extend này. Trong này AI sử dụng các thông tin nó thu thập được trong Scratch Pad để viết tiếp theo câu mà mình đang viết đây.

![](/posts/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow-7.jpg)

Thử ha!

```
Thì đầu tiên Prompting là gì?
Prompting là 
```

Hit Extend!

AI nó sẽ generate ra được cho mình nguyên một đoạn script.

Thì như các bạn đoán. Script của video này mình cũng sử dụng AI để generate lên một phần không nhỏ.

OK thì trong nguyên chuỗi vừa rồi mô hình Chain of Thoughts được sử dụng như thế nào?

Thực ra nó là 1 chuỗi CoT ReAct thì đúng hơn. Vì mình có sử dụng Tools bên ngoài là Vector Database để cung cấp nội dung cho AI viết thêm.

Chuỗi CoT bắt đầu bằng việc nhận yêu cầu: Viết thêm content dựa trên nội dung mà mình đưa ra.

Nội dung đưa ra là là câu đơn giản thôi: "Thì đầu tiên Prompt Engineering là gì? lala…"

Sau đó AI lên kế hoạch để xử lý, nó hiểu là cần tìm hiểu về "prompt engineer" và sử dụng công cụ là "Youtube Video Script" để tìm thông tin.

Và nó query từ "prompt engineer" để được kết quả. Xong Extract information ra 1 cái scratch pad.

Từ đó nó có thể kết hợp để viết tiếp nội dung của mình. Hoàn thành 1 đoạn script.

Giờ mình thử demo lại quá trình này thêm 1 lần nữa ha.

Prompt vào:

```
ReAct
Rồi thì khái niệm tiếp theo là ReAct.
Thì ReAct, viết kết hợp Reasoning - tư duy và Action - hành động, là một khái niệm hay thường được sử dụng chung với Chain of Thought.
Nó là ý tưởng mà…
```

Sẽ cho ra kết quả là một đoạn script nữa.

![](/posts/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow/ai--so-luoc-ve-cac-phuong-phap-prompting-va-ung-dung-ai-vao-workflow-8.jpg)

# Conclusion

OK thì video cũng đã dài. Mình cũng muốn tổng kết lại trải nghiệm vừa qua trong quá trình sử dụng và tích hợp các giải pháp AI cho một vài dự án mà mình tham gia.

Thì như mình đề cập ở Video trước việc sử dụng AI hiện nay ngày càng phổ biến. Và điều quan trọng là mình có khai thác được nó không. Biết cách khai thác nó không.

Thực ra thì trong lúc áp dụng thực tế nó cũng chưa phải là hoàn hảo lắm. Với số lượng content mà AI generate ra thì mình cũng phải edit lại phần lớn.

Nhưng mà nếu các bạn tiếp cận nó như 1 công cụ tự làm hết thì có lẽ góc nhìn đó không chính xác lắm nha.

Liên tưởng đến hệ thống lái xe tự động Tesla, họ cũng có 5 mức tự động hoá. Người dùng vẫn là 1 yếu tố quan trọng trong quá trình vận hành hệ thống AI.

Nghiệm về các ứng dụng AI và LLM hiện tại cũng vậy. Nhiều người đang mơ hồ hiểu AI đang ở level tự động hoàn toàn này nhưng thực tế không phải. Chúng ta nên hiểu AI đang ở level 2 3 này thôi.

Và nên hiểu là những ai chịu trải nghiệm qua thử các level 2 3 4 này thì mới có thể có khả năng sử dụng AI ở level 5 thôi.

Cảm ơn các bạn đã theo dõi tới đây. Xin chào và hẹn gặp lại.

Chop out!

