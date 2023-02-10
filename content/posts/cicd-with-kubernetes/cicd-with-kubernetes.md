+++
title = "CICD with Kubernetes"
author = ["Chop Tr (chop.dev)"]
description = "Tiếp theo thực hành dựng cụm Kubernetes thì chạy các chương trình trên cụm cần 1 dây chuyền để tự động hóa và hệ thống hóa các chuỗi. Video này mình sử dụng Circle CI và ArgoCD để dựng lên một chuỗi CICD. Phục vụ cho việc release các ứng dụng do mình tự quản lý."
date = 2023-01-20T00:00:00+07:00
tags = ["kubernetes", "cicd", "argocd", "circleci"]
draft = false
cover = "/posts/cicd-with-kubernetes/cicd-with-kubernetes-2.jpg"
+++

# Video

[https://www.youtube.com/watch?v=82I7Z367CNw](https://www.youtube.com/watch?v%3D82I7Z367CNw)

# Intro

Hi. Xin chào. Chop trở lại với video về DevOps. Thì video lần này là tiếp theo video trước mình setup 1 cái cụm kubernetes bằng k3s - link này ha.

Thì như nói ở cuối video trước, sau khi học cách dựng và manage 1 cụm kubernetes nhỏ đó để học và thực hành thêm thì mình tìm hiểu về cách CICD trên kubernetes trong thời gian vừa rồi.

Đầu tiên CICD là gì. Thì CICD là Continuous Integration and Continuous Deployment, tạm dịch ra là Tích hợp liên tục và Triển khai liên tục.

Tích hợp liên tục - CI - ở đây là nói đến việc xây dựng lên các chương trình để thực hiện các Business Logic hay còn gọi là Logic Nghiệp vụ.

Còn Triển khai liên tục - CD - là việc đưa các chương trình đã được phát triển vào hoạt động thực tế.

Để hình dung rõ hơn quá trình này thì các bạn có thể liên tưởng tới một công ty ha. Để vận hành 1 công ty thì các bạn phải thực hiện việc lên kế hoạch nghiên cứu và phát triển thực hiện các Nghiệp vụ của công ty.

Lập trình cũng vậy và nó y hệt sơ đồ này thôi sẽ có các bước:![](/posts/cicd-with-kubernetes/cicd-with-kubernetes-0.jpg)

- Plan: Là đưa ra các yêu cầu kỹ thuật, các requirement về chương trình sắp phải làm. Một số nơi còn gọi là specification. Các yêu cầu này sẽ đến từ các bộ phận lên kế hoạch như Project Planner hoặc công ty nhỏ thì có thể đến trực tiếp từ Ban giám đốc luôn.
- Code: Là bước thực thi hay thi công. Các đoạn code các chương trình được tạo ra để thoả mãn các yêu cầu trong cái Requirement của Plan kia.
- Build: Đối với lập trình thì có thêm cái bước Build ra là chuyển hoá từ các đoạn code thành chương trình máy tính có thể dùng chạy.
- Test: Bước này là kiểm tra lại chất lượng của các chương trình được phát triển. Đảm bảo chất lượng của các chương trình hoạt động đúng như các yêu cầu đặt ra trong Requirement. Bước này sẽ giảm thiểu được việc thiếu sót trong quá trình xây dựng thi công. Cũng như đảm bảo được chất lượng của chương trình nói chung.
- Release: là bước đưa chương trình vào hệ thống.
- Deploy và Operate: là đưa vào triển khai và vận hành. Là cái lúc áp dụng các chương trình mới vào thực tế, phục vụ cho người dùng cuối, user.
- Monitor: Trong lúc vận hành thì bước khá quan trọng chính là Monitor - theo dõi hệ thống. Một chương trình tốt ngoài việc thực hiện đúng những thứ trong requirement còn nên có những chỉ số theo dõi. Để biết được tính hiệu quả trong công việc của nó. Các chỉ số này sẽ quay lại đóng vai trò không thể thiếu cho quá trình Lên kế hoạch mới.

Và như vậy là 1 chuỗi xoay vòng CICD liên tục. Các kế hoạch được đưa ra nghiên cứu, rồi thi công các chương trình, rồi triển khai, áp dụng, theo dõi, cải tiến, v.v. Là một quá trình mà một công ty hay một đơn vị nào cũng phải thực hiện kể cả áp dụng cho từng cá nhân mỗi người.

## CICD with Kubernetes

Thì quay lại, chúng ta sẽ áp dụng CICD cho công việc lập trình xây dựng và triển khai phần mềm trên một cụm Kubernetes ha.

## CircleCI

Cho công việc CI mình sẽ sử dụng CircleCI.

CircleCI là một dịch vụ quản lý chuỗi CI khá nổi tiếng, ngoài nó thì còn một số tên tuổi khác mà chắc bạn nào làm dev cũng có thể đã nghe qua là GitLab Flow, Github Actions, hay Jenkins.

Mình thì xài CircleCI cũng lâu rồi, từ khi bắt đầu code dạo lận, nên sẽ dùng nó để demo.

## ArgoCD

Công cụ để CD của mình sẽ là ArgoCD là một công cụ mà mình mới xài đây thôi lúc học Kubernetes. ArgoCD này sẽ được chạy trên cụm Kubernetes của mình luôn và nó quản lý công việc triển khai các workload lên các node của mình.

ArgoCD là được xây dựng cho Kubernetes thôi và theo thiết kế là áp dụng GitOps. Là một khái niệm có thể hiểu nhanh là dùng Git để quản lý các tài quyên hoạt động - Operation Resources. Thay vì quản lý bằng các chương trình UI phải bấm nút này nút kia thì ArgoCD dùng code và git để quản lý các tài nguyên. Giúp việc triển khai được tự động hoá và hệ thống hoá hoàn toàn.

## Sơ đồ CICD

Tổng thể dây chuyển CICD của mình sẽ theo sơ đồ sau:

![](/posts/cicd-with-kubernetes/cicd-with-kubernetes-1.jpg)

Business Code của mình sẽ được host trên Github repository.

Khi mình thi công code xong, push code lên Github thì dây chuyền pipeline sẽ tự động trigger CircleCI để chạy các bước Build Image rồi Push Image.

Build Image là sử dụng công cụ đóng gói chương trình như Docker hay Podman để build lên cái image chương trình. Ở đây mình sẽ sử dụng Podman vì nó đơn giản hơn docker nhiều và chạy rootless - tức không cần quyền root nên sẽ tốt hơn Docker về mặc security.

Build xong thì sẽ Push cái image đó lên 1 cái Private Docker registry. Là vì mình không muốn host mấy cái image của mình public nên dựng luôn 1 con registry này lên để host. Thường thì nếu các bạn muốn host public hoặc không muốn tự quản lý docker registry thì có thể sử dụng Docker Hub. Riêng mình thì thích 1 dây chuyền kín hơn nên sẽ tự xây tự quản.

Sao khi build xong thì để release mình sẽ request 1 cái code trên git infra code để trigger 1 cái dây chuyền khác để CD -  triển khai cho cụm kubernetes của mình, sử dụng ArgoCD. Công cụ này như nói ở trên sẽ quản lý các deployment cũng như các service và resource liên quan. Đảm bảo cho hệ thống của mình chạy ổn định và đúng với thiết kế hay kế hoạch đã lập ra.

# Demo

Ok thì bây giờ sẽ demo quá trình setup lên chuỗi Pipeline tự động hóa việc CICD mới trình bày ha.

## Docker Registry

Ok. Thì việc đầu tiên là thiết lập cái Docker Registry ha.

Với cái Docker Registry này thì chúng ta phải handle một thứ nữa chính là storage. Là 1 cái "Kho" để chứa dữ liệu các cái images được build ra.

Ở đây chúng ta sẽ sử dụng 1 phần mềm nữa setup trên Kubernetes chính là Longhorn.

### Longhorn

Longhorn là một công cụ rất mạnh trong việc xây và quản lý kho dữ liệu trên Kubernetes. Trước khi thử công cụ này thì mình cũng đã thử xài NFS - Network File System - để setup. Nhưng Longhorn có nhiều features tốt hơn rất nhiều trong việc xử lý storage cho kubernetes nên mình chuyển hết tất cả các setup cho storage về chỉ sử dụng Longhorn.

Điểm mạnh của nó là tính resilience của hệ thống dữ liệu, Longhorn tự động replicate / là tạo bản sao dữ liệu trên nhiều node khác nhau chứ không phải 1 node. Phục vụ cho tình huống có con node bị hư hay vì lý do gì đó mà nó èo, không chạy nữa thì các node khác vẫn có dữ liệu để hoạt động bình thường.

Thêm nữa là có feature snapshot và backup luôn. Snapshot là để lưu lại các thời điểm của dữ liệu trong quá khứ. Có thể tái tạo lại ở bất kỳ thời điểm nào. Backup là để upload dữ liệu lên 1 bên thứ 3, có thể xài AWS S3 hay một kho dữ liệu khác chuyên xử lý lưu trữ để tăng tính bền bỉ cho dữ liệu.

Chúng ta sẽ bắt đầu setup Longhorn ha.

Tài liệu để setup Longhorn thì các bạn tham khảo ở link này:

[https://longhorn.io/docs/1.4.0/deploy/install/install-with-helm/](https://longhorn.io/docs/1.4.0/deploy/install/install-with-helm/)

Có nhiều cách để setup Longhorn mình sẽ chọn cách đơn giản và tiện lợi nhất là cài bằng Helm chart. Để cài helm thì tuỳ vào môi trường các bạn đang sử dụng nhe.

MacOS thì `brew install helm`

Ubuntu thì `apt instal helm`

Aniway, cài Longhorn bằng helm thì sử dụng lệnh sau:

```bash
helm repo add longhorn https://charts.longhorn.io
helm repo update
```

Mình xài helm 3 nên sẽ sử dụng lệnh sau:

```bash
helm install longhorn longhorn/longhorn --namespace longhorn-system --create-namespace --version 1.4.0
```

Lệnh này sẽ cài Longhorn trên namespace longhorn-system. Ở đây thì là best practice của kubernetes là các công cụ hay các chức năng chúng ta nên phân ra theo namespace. Chúng sẽ giúp ta 2 việc. 1 là dễ quản lý hơn 2 là bảo mật hơn vì các pod hay service chỉ nói chuyện nội bộ trong network trong namespace của tụi nó thôi.

Ok các bạn có thể chạy lệnh này để kiểm tra

```bash
kubectl -n longhorn-system get pod
```

Các pod của chúng ta khi setup xong sẽ chuyển trạng thái sang `Running`.

Ok, và các pod Longhorn đã đc cài đặt xong. Chuyển sang `Running`.

Rồi và giờ chúng ta sẽ có thể access cái dashboard của Longhorn để xử lý các tác vụ quản lý Storage bằng Longhorn. Bằng cách port-forward cái longhorn-frontend bằng lệnh sau:

```bash
kubectl port-forward svc/longhorn-frontend -n longhorn-system 8003:80
```

Lệnh này có nghĩa là port-forward cái service longhorn-frontend thuộc namespace longhorn-system từ cổng 80 bên trong ra cổng 8003 bên ngoài.

Và vậy là chúng ta có thể access vào Frontend UI longhorn trên localhost:8080 rồi.

Thử nè. OK được rồi.

Kiểm tra xung quanh thì có mấy tab sau: Node là 3 cái node mà mình đang chạy ha. Volume là các khối data được các pod claim. Hiện chúng ta đang không có khối data nào. Hồi nữa sẽ tạo Deployment rồi Claim cái Persistent Volume Claim thì chúng ta sẽ thấy nó hiện ở đây. Sẽ quay lại chỗ này sau. Backup thì như mình nói ở trên là để dự phòng cho data bị hư tổn hay gặp vấn đề sự cố, ở đây các bạn có thể config để đẩy các bản backup lên S3 trên AWS.

### Docker registry

OK và giờ chúng ta sẽ setup cho Docker Registry.

Thì để tạo cái registry này đầu tiên mình sẽ tạo 1 cái certificate ssl. Sử dụng lệnh sau:

```bash
openssl req \
  -newkey rsa:4096 -nodes -sha256 -keyout certs/registry.key \
  -addext "subjectAltName = DNS:docker-registry.chop.dev" \
  -x509 -days 3650 -out certs/registry.crt
```

Sau đó để chuẩn bị cho việc setup. Chúng ta sẽ sẽ tạo 1 cái namespace tên là `docker-registry`.

Có các file certificates trong thư mục certs rồi. Chúng ta sẽ tạo 1 cái kubernetes secret bằng lệnh sau:

```bash
kubectl create secret tls registry-cert \
    --cert=certs/registry.crt \
    --key=certs/registry.key \
    -n docker-registry
```

Lệnh này sẽ tạo secret trong namespace `docker-registry` vừa tạo.

Ok sau đó có thể chạy file manifest này để setup `docker-registry`. Chúng ta sẽ đi nhanh qua file này ha.

```bash
k3s/docker-registry/stack.yaml
```

Đầu tiên là khai báo cho kubernetes chúng ta cần 1 cái Persistent Volume Claim, có dung lượng là 20Gi. StorageClassName sẽ để là `longhorn` vì như đã đề cập ở trên registry này sẽ dùng storage có tính resilience cao để lưu trữ các bảng image của các chương trình mình deploy nên sẽ xài `longhorn`.

AccessModes sẽ là `ReadWriteMany` để các pod `docker-registry` có thể được tạo ở bất kỳ node nào mà vẫn kết nối được với storage.

Ok đến phần khai báo Deployment. Thì ở đây chúng ta chỉ cần 1 replica không nhiều tại 1 mình mình sử dụng. Nếu có nhu cầu CICD liên tục thì sẽ phải scale bằng cách nâng số này lên. Spec của nó thì sẽ sử dụng container image là registry:2 là image official chính thức để host handle docker registry.

Trong phần các biến môi trường environment viết tắt là env này nè thì sẽ khai 2 cái certificate mà nãy mình mới tạo. 2 file này sẽ được mount vào bằng volumes ở dưới đây.

Còn cái storage để chứa dữ liệu của các images được build ra sẽ được mount bằng khai báo volume mount này nối với cái persistent volume claim cùng tên ở trên.

Ok, còn phần cuối là cái service để expose cái deployment ra thôi. Là 1 cái LoadBalancer mở cổng 5000 trùng với công 5000 của pod ở trong, ra ngoài để sử dụng thôi.

Apply vào là xong ha.

Và chúng ta sẽ kiểm tra việc tạo pod này diễn ra. Các bạn có thể sử dụng lệnh

```bash
kubectl get pods -n docker-registry
```

để theo dõi việc tạo pods và lệnh

```bash
kubectl describe all -n docker-registry
```

để xem mọi việc đang diễn ra trong quá trình setup lên cái chức năng docker-registry này. Nếu có vấn đề xảy ra thì thông tin báo lỗi sẽ được báo ở output này luôn.

Để trực quan hơn thì chúng ta có thể xem bằng Kubernetes Dashboard đã setup ở video trước. Đây và đây là thông tin của pod `docker-registry` đang chạy ở trạng thái Running.

Chúng ta cũng có thể qua Frontend của Longhorn để xem thêm cái volume claim lúc nãy khai báo nữa. Nhấn vào thì nó sẽ thể hiện rõ cái volume hiện đang được deploy trên các node nào và có bao nhiêu phiên bản để phục vụ việc truy xuất. Ok có đến 3 cái phiên bản replica, chúng ta sẽ ko sợ việc bị mất hay bị corrupt dữ liệu nếu quản lý storage như vầy.

## CircleCI

Tiếp theo sẽ là setup CircleCI.

### Setup Self-hosted Runner

Để trigger cho máy host build ra thì chúng ta sẽ phải setup máy và đăng ký máy với CircleCI ha.

Thì để setup CircleCI các bạn có thể vào link sau để xem các bước thực hiện. Mình cũng sẽ làm theo document. Các bạn xem thêm link dưới đây ha.

[https://circleci.com/docs/runner-overview/](https://circleci.com/docs/runner-overview/)

Đầu tiên giải thích sơ việc sử dụng kiểu môi trường nào để chạy máy self-host runner cho CircleCI. Có 2 kiểu là Container Runner và Machine Runner.

Mình thì sử dụng kiểu Machine Runner, là CircleCI sẽ gửi các lệnh trong pipeline CI về máy host của mình (chính là con Raspberry Pi này). Và nó sẽ chạy các dòng lệnh mà mình setup sẵn như chạy trực tiếp trên máy. Chút nữa đi qua file config.yaml các bạn sẽ thấy.

Còn kiểu Container thì như các bạn đoán, là setup cái Runner đó trên cụm kubernetes. Mình cũng đã thử phương pháp này thì nó sẽ chạy các chức năng của CircleCI Runner như bình thường. Có điểm khác biệt là môi trường chạy sẽ gói trong kubernetes pod. Pod này thì nó chạy image circleci tuỳ mình setup nhưng có một số image không support arm64 nên mình không setup theo kiểu này được.

Ok và theo hướng dẫn để cài đặt cho máy Linux bằng link dưới đây

[https://circleci.com/docs/runner-installation-linux/](https://circleci.com/docs/runner-installation-linux/)

Thì mình sẽ copy từng lệnh vào cho máy Runner thôi.

Ok lệnh này là để curl tải về cái script để download-launch-agent.sh

xong `chmod` là change mode cho nó, có quyền executable +x

và setup cái môi trường để nó biết là đang setup cho arm64 ha. Và sh chạy script đó thôi.

Script trên sẽ tạo 1 user để đại diện cho CircleCI chạy các lệnh lúc được gửi về. Và giờ là sẽ cấp quyền cho user circleci đó có quyền chạy sudo mà không cần password.

Tiếp theo thì 3 cái lệnh này là để chúng ta config cho cái runner này liên kết được với CircleCI. Bằng cách là tạo và khai báo token cho nó.

Token thì các bạn quay lại dashboard của CircleCI. Vào menu Self-Hosted Runners này và nhấn nút tạo [Create Resource Class] này. Đặt tên cho nó và lấy cái Token.

Xong quay lại cái file agent-config.yaml kia paste cái token và đặt tên cho cái Runner. Save lại là OK.

Dưới đây là lệnh để start con Runner này. Nhưng mình sẽ không sử dụng lệnh này mà sẽ setup 1 cái service cho systemd để máy có thể tự động start Runner sau mỗi lần restart hay crash server.

Cách setup sẽ nằm dưới đây 1 chút.

3 lệnh này sẽ tạo và set quyền cho file service thôi.

Còn đây là nội dung file service. Paste vào và save lại là xong.

Rồi, bây giờ chúng ta có thể enable cái service circleci.service đó. Và start nó bằng lệnh:

```bash
sudo systemctl start circleci.service
```

Ok để kiểm tra xem service chạy ổn thì xài lệnh sau.

Ok vậy là service circleci đã chạy ổn ngon lành.

Bây giờ quay lại Dashboard của CircleCI thì các bạn sẽ thấy Runner mới tạo hiện lên trên danh sách.

OK, good.

### Setup codebase with config.yaml

Mọi việc có vẻ ổn. Giờ mình sẽ qua config tiếp tới cái codebase chứa business logic để tự động build nó ra image và đẩy lên docker-registry.

Với codebase này thì đơn giản thôi. Viết bằng Golang. Trong này thì có mấy cái endpoints.

/healthz trả về http code 200 để bên ngoài có thể kiểm tra là con pod này còn sống và có thể response.

Để chuẩn bị cho việc Build Image thì mình sẽ phải chuẩn bị 1 file Dockerfile.

Trong file này chủ yếu là cài đặt các cái thư viện cần để build bằng lệnh `go mod download` nè rồi chạy `go build -o` cùng với đường dẫn nơi build cái binary ra thôi.

Cuối cùng là khai CMD để bắt đầu chạy cái app. Các bước standard của Docker nên mình đi nhanh ha.

Có file này thì trên máy host có thể dùng podman để build ra image được rồi.

Và đây là file config.yaml trong thư mục .circleci

Thì với cách bố trí này, circleci sẽ tự động tìm ra file, đọc và chuyển các lệnh này về Runner của nó. Thì mình sẽ set Runner là con Runner vừa mới tạo hồi nãy.

Thì set ở đâu, đó chính là cá khai báo `resource_class` này. Set đúng tên resource class cho con runner là OK.

Bên dưới đó là các bước - steps - để thực hiện khi code được push lên.

Bước đầu thì đơn giản thôi, là clone cái repo về. Ở đây các bạn sẽ thấy 2 cái biến CIRCLE_REPOSITORY_URL và CIRCLE_BRANCH là 2 cái biến đặt biệt sẽ được CircleCI tự động inject vào khi chạy. Chắc các bạn cũng đoán được thì nó sẽ là cái đường dẫn của repo và cái branch mới vừa push lên thôi.

Tiếp theo là mình kiểm tra podman version. Nãy cũng đề cập là mình dùng podman thay thế cho docker rồi. Thì các bạn xem ở đây podman nó thiết kế API command line y hệt docker nên nhìn đọc podman nhưng cũng có thể hiểu là tương đương lệnh docker ha.

Thì đầu tiên là mình build rồi sau đó là push lên registry thôi.

Các bạn để ý ở đây thì cái domain của registry là nó giống với cái certificate mà mình gen ra lúc setup cho cái docker-registry này ha. Còn port là 5000 cũng như setup lúc nãy.

Oh quên nữa, lúc nãy chúng ta dùng domain docker-registry.local để làm domain cho cái private docker-registry. Thì ở đây phải config file `/etc/hosts` để có thể resolve được cái domain này nhe.

Và config này cũng phải được setup cho các con node trong cụm kubernetes luôn để tụi nó có thể request lên được cải private docker registry này.

Chúng ta sẽ vào lại máy Runner update `/etc/hosts` để thêm cái entry docker-registry.local này trỏ về 

Ok vậy là xong. Push cái code này lên git remote thôi.

### Add to CircleCI Projects

Và chúng ta sẽ quay lại Dashboard của CircleCI để thêm cái project này vào danh sách projects được quản lý bới CircleCI.

Siêu đơn giản, chúng ta sẽ nhấn Setup project. Xong chọn `Fastest` rồi OK Setup Project thôi. CircleCI sẽ tự động tìm thấy file config.yaml chúng ta đã setup lúc nãy và bắt đầu chạy các bước Tích hợp - CI cho mình.

Để theo dõi các quá trình chạy các bước CI các bạn có thể vào menu Dashboard ở đây, tìm đến pipeline của project vừa mới setup để xem. Các bước sẽ được CircleCI theo dõi và báo trong view này, ở đây cũng có thêm thông tin về máy Runner đang chạy là gì, hash của commit đang được xử lý, v.v

OK và các bước build bà push image lên docker-registry đã được thực hiện xong.

Chúng ta sẽ tiếp tục đi tiếp đến quá trình CD là continuous deployment, là quá trình Triển khai liên tục sử dụng ArgoCD ha.

## ArgoCD

### Setup ArgoCD on kubernetes

Để setup ArgoCD thì chúng ta sẽ tạo 1 cái namespace argocd để gộp chung các resource liên quan đến argocd vào đây cho dễ quản lý. Sau đó chạy lệnh kubectl apply -f để apply file manifest install.yaml là kubernetes sẽ tự động setup ArgoCD.

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Các bạn có thể vào link sau để đọc thêm và copy 2 lệnh install.

Trong link này cũng sẽ hướng dẫn cách lấy password được generate ra sẵn cho admin. Đây là pass được generate ra nên để sử dụng ở production thì các bạn phải đổi pass và phân quyền hợp lý nhe. Ở đây mình sử dụng tạm để demo ArgoCD thôi.

Ok để vào dashboard của ArgoCD thì cúng ta sẽ port-forward service của nó ra như Longhorn thôi. Sử dụng lệnh sau:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Ở đây thì các bạn thấy mình đã có sẵn 1 cái application mini-hook-app rồi. Để đi qua 1 vòng xem trong này có gì ha. Trong này các bạn sẽ xem được overview của application này đang sử dụng resource gì. Ở đây tổng thể cái app có 1 cái deployment, trong này có 3 cái replicaset do mình đã deploy 3 version lần rồi. Trong cái replicaset mới nhất thì đang chạy 3 cái pod phục vụ cho application này. Nếu muốn thì mình có thể scale số lượng pod cũng như thay đổi resource CPU và RAM cho chúng ở file manifest hồi nữa sẽ xem tiếp.

Ngoài ra thì có 1 cái Service LoadBalancer và 1 cái PersistentVolumeClaim ở đây để phục vụ cho nó nữa.

Tổng quan cái app này là như vậy. Và chúng ta sẽ làm 1 cái application khác cũng tương tự ha. Và như nói lúc nãy, tất cả các configuration, setting đồ này đều được khai báo và dựng lên từ những file manifest và chúng ta sẽ có thể Version control tụi nó rõ ràng chính xác, và roll back hoặc thay đổi gì thì chỉ là những cái PR, Push lên git thôi.

### Setup Infra repo and push a new application

Ok thì để setup cái application cho Argo chúng ta sẽ cần 1 cái git repository.

Mình sẽ sử dụng github để tạo 1 cái repository tên là demo-argocd ha. Github này mình để public để dễ tích hợp, nếu các bạn muốn có thể setup cho private git repo sử dụng SSH key thôi cũng không khó lắm.

OK và giờ mình sẽ chuẩn bị cái repo này thôi.

Chạy các lệnh sau để init cái git setup repo trên local và liên kết nó với Github vừa mới tạo.

Ok và chúng ta bắt đầu setup ArgoCD application bằng cách khai báo 1 file yaml như sau:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: mini-hooks-app
  namespace: argocd
spec:
  project: default

  source:
    path: mini-hooks
    repoURL: 'git@gitlab.com:choptr/argocd-homelab.git'
    targetRevision: HEAD
  destination:
    name: ''
    namespace: mini-hooks-app
    server: 'https://kubernetes.default.svc'

  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

Thì cũng như những manifest bình thường thôi, manifest cho ArgoCD Application này chúng ta khai báo tên của app là `demo-app`, ở trong namespace là `argocd`. Ah namespace này phải là argocd nha để ArgoCD có thể quản lý app này. Còn namespace cho cái resource của app thì có thể chỉnh ở spec bên dưới.

OK tới spec của application thì được khai ở đây.

Ở đây là source được khai báo có cái path là `demo-app` và repoURL là ‘github.com/trchopan/demo-argocd.git’. Có nghĩa là ArgoCD sẽ clone cái git ở demo-argocd trên github về và tìm thư mục `demo-app` để setup resource cho cái app này.

Và như đề cập lúc nãy chúng ta có thể setup namespace cho resource của application này ở đây. Gọi nó là demo-app ha.

Ở syncPolicy thì có 2 options cần đề cập là prune và selfHeal.

Prune có nghĩa là khi chúng ta xoá resource trên git repo thì ArgoCD sẽ tự động setup lại môi trường kubernetes bằng cách xoá (prune là tỉa cây đi á) các resource tương ứng.

SelfHeal thì là xử lý chiều ngược lại, là nếu chúng ta thay đổi bằng tay các resource trên Kubernetes ví dụ như sửa tay nâng replica của deployment lên đi thì ArgoCD cũng sẽ tự phát hiện ra thay đổi này và sửa lại tương ứng với config trên upstream là git repo.

Thì 2 setting này đảm bảo cái git repo là single source of truth cho cả các application trên kubernetes này. Đảm bảo cho việc quản lý ít bị sai sót nhất.

Rồi thì file application đã được chuẩn bị.

Chúng ta sẽ chuẩn bị thêm 1 file nữa trong thư mục `demo-app`. Như nói lúc nãy thì thư mục này sẽ được ArgoCD vào để tìm các file manifest để setup cho các resource của app.

Trong này thì mình gói gọn lại 1 file resource manifest thôi, tên `stack.yaml`.

Trong này cũng khai báo 3 cái resource là PersistentVolumeClaim, Deployment và Service. 3 Resource này sẽ phục vụ cho việc chạy cái Application của mình.

PersistentVolume là để khai đăng ký kho dữ liệu trên Longhorn.

Deployment là để biết kéo Docker Image về từ đâu. Ở đây là từ cái private docker-registry setup lúc nãy. Có cổng là 5000 ha. Phía sau là tag name của cái image được build ra. là demo-app:v0.0.1.

Rồi và chúng ta sẽ push các thông tin này lên github ha.

Git push origin main thôi.

### Setup ArgoCD Repositories

Quay lại Dashboard của ArgoCD chúng ta sẽ setup cái re

Rồi, chúng ta sẽ vào Settings, vào mục Repositories này, sau đó input các thông tin của git repo vào.

Chọn Connection Method là via HTTS cho public repo ha.

Type là Git, Project thì như setup trong file nãy là default.

Repository là link của github repo thôi paste vào đây.

Username password TLS đồ là không có vì mình dùng public git repo.

Và nhấn Connect là ArgoCD sẽ setup lên ha.

Rồi, để apply application thì cũng như các manifest khác, chúng ta sẽ dùng lệnh `kubectl apply -f`

Và mình sẽ chuyển cửa sổ để xem lệnh apply này được thực hiện real time luôn ha.

Các bạn có thể thấy các resource của application được tạo ra theo như yêu cầu được đặt ra trong file manifest.

Tuần tự các Service, Deployment rồi trong deployment có các Pod được tạo.

Và vậy là chúng ta đã có 1 chuỗi Pipeline CICD hoàn chỉnh từ code ra máy chủ server luôn.

# Conclusion

Tóm tắt lại ha. Sau khi có quy trình CICD này được xây lên thì để implement feature mới hay thay đổi ở đâu đó, sửa bug gì đi, chúng ta chỉ cần thực hiện các thao tác trên repo chứa Business Code. Xong đẩy lên Git. Các thao tác test code, build image sẽ được quy trình CI - Tự động tích hợp - tự xử lý và đẩy lên 1 cái image repository chứa nội dung code cho app được đóng gói sẵn sàng cho các máy chủ thực thi.

Quy trình CD - Tự động triển khai sẽ sử dụng các code này cùng với resource đang có của máy chủ server. Chạy pipeline để kéo các nội dung images cho app được đóng gói về. Sắp sếp các bộ phận các resource liên quan để đảm bảo cho việc vận hành tối ưu nhất. Và đưa các nội dung này vào thực hiện trên các máy chủ.

Ok và qua video này thì bản thân mình cũng đã học được thêm khá nhiều về vận hành cụm kubernetes. Tương lai sẽ sử dụng nó cho các dự án mà mình đang thực hiện và trau dồi thêm những kỹ năng khác nữa. Kế hoạch chắc là học cách scaling và phòng chống các rủi ro thiên tai tăng tính dẻo dai - resilience - của toàn hệ thống lên.

Cảm ơn các bạn đã theo dõi tới đây. Xin chào và hẹn gặp lại. Chop Out. 🖖

