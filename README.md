# project url
https://vercel.com/greens-projects-3e30f4e0/nextjs-beginner/HcBpKdKFWYArGJ8XZ8hUiSHsjGTN  

https://nextjs-beginner-rho.vercel.app/  

https://supabase.com/dashboard/project/pdjqoyqsgaijfclkaiux  


# installation 安装
https://nextjs.org/docs/app/getting-started/installation  
https://www.udemy.com/course/next-js-the-complete-developers-guide/  

```bash
npx create-next-app@latest
```
![1.png](docs%2F1.png)
![2.png](docs%2F2.png)

# Project structure and organization 项目结构和组织
https://nextjs.org/docs/app/getting-started/project-structure#folder-and-file-conventions  

# link supabase
```shell
npx supabase init
npx supabase link --project-ref pdjqoyqsgaijfclkaiux
```

# style
![3.png](docs%2F3.png)
The hero.tsx file in a Next.js project typically defines a React component responsible 
for rendering the hero section of a webpage. The hero section is usually the first visual 
element users encounter, serving as an introduction to the website's content and purpose. 
It often includes a prominent headline, a brief description, and a visually appealing 
background image or video.
Next.js 项目中的 hero.tsx 文件通常定义一个 React 组件，负责呈现网页的英雄部分。 
英雄部分通常是用户遇到的第一个视觉元素，作为网站内容和目的的介绍。 它通常包括一个突出的标题、
一个简短的描述和一个视觉上吸引人的背景图像或视频。

# How to Validate Forms with Zod and React-Hook-Form 如何使用 Zod 和 React-Hook-Form 验证表单
https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/  

# Integrate Supabase with Clerk
https://clerk.com/docs/integrations/databases/supabase  

# Build your own sign-up page for your Next.js app with Clerk 
https://clerk.com/docs/references/nextjs/custom-sign-up-page 

# dashboard page
https://clerk.com/docs/references/nextjs/add-onboarding-flow  

https://github.com/clerk/clerk-nextjs-onboarding-sample-app/tree/main/src/app/dashboard  


# clerk user created webhook to supabase edge function
https://github.com/bmorrisondev/quillmate/tree/main/supabase/functions  
![clerk-user-schema.png](docs%2Fclerk-user-schema.png)  

```shell
npx supabase functions deploy clerk-webhooks
```
https://supabase.com/docs/guides/functions/deploy  

add header to the clerk webhook request
```shell
Authorization: Bearer {ANON_KEY}'
```

![clerk-user-created.png](docs%2Fclerk-user-created.png)



# form submission
```
src/app/form/
├─ actions.ts          # server action 
├─ FormClient.tsx      #  all interactive logic for form state & validation
├─ MessageClient.tsx      #  all interactive logic for message
└─ page.tsx            # thin wrapper → shows user + renders <FormClient />
```

# n8n webhook
https://www.youtube.com/watch?v=IvUYJQkf6sA  

![4.png](docs%2F4.png) 

![5.png](docs%2F5.png)

when user submits the form, it will trigger a webhook to n8n, 
![6.png](docs%2F6.png)

# n8nui
https://github.com/n8nui/examples  

![workflow.png](docs%2Fn8nui%2Fworkflow.png)  

![start.png](docs%2Fn8nui%2Fstart.png)  

![monitor.png](docs%2Fn8nui%2Fmonitor.png)  

![end.png](docs%2Fn8nui%2Fend.png)  
```shell
// Folder layout (all under `src/app/api/n8nui`):
//   ├─ route.ts         → POST /api/n8nui          – start workflow
//   └─ [xid]/route.ts   → GET  /api/n8nui/:xid     – poll status
//                        → POST /api/n8nui/:xid    – resume Wait node
// ------------------------------------------------------------
```
