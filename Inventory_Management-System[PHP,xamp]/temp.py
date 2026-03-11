# # def reverse( x: int) -> int:
# #         rv=0
# #         f=0
# #         if(x==0): 
# #             return 0
# #         if(x<0):
# #             f=1
# #         while(x!=0):
# #             ld = x%10
# #             rv = rv * 10 + ld
# #             x//=10
# #         if(f==1):
# #             return -abs(rv)
# #         else:
# #             return rv
# # print(reverse(-121))


# # s="HELLOWORLD" # len=10
# # # s=input("Enter your name: ")
# # n=len(s)
# # t=[]
# # for i in range(n+1):
# #     for j in range(n+1):
# #         ss = s[i:j]
# #         if( ss not in t):
# #             t.append(ss)
# #     if(len(ss)==n):
# #         break
# # print(len(max(t)))

# # print(max(t))
# # print(t)
# # import time
# # for i in t:
# #     print(i)
# #     time.sleep(1)

# #  Two sum
# # ls=[]
# nums = [3,2,4]
# target = 6
# # flag=0
# # for i in range(len(nums)):
# #     for j in range(len(nums)):
# #         s = nums[i]+nums[j] 
# #         if(s==target) :
# #             ls.append(frozenset([i,j]))
# # l = [list(x) for x in ls if len(x) > 1]
# # if(l):
# #     print(l[0])
# # else:
# #     print([])

# d={}
# for i,n in enumerate(nums):
#     c = target - n
#     if c in d:
#         print([d[c],i])
#     d[n] = i
#     # print(i,"  ",n)


# INSERT INTO customers (name, phno) VALUES ('Shiva Charan', '9876543210'),
# ('Rahul Sharma', '9123456789'),
# ('Priya Singh', '8897654321'),
# ('Ankit Verma', '9988776655'),
# ('Sonia Jain', '8877665544'),
# ('Karan Thakur', '7766554433'),
# ('Meena Gupta', '6655443322'),
# ('Amit Roy', '7788990011'),
# ('Sneha Patel', '8899001122'),
# ('Rohan Mehta', '9001122334'),
# ('Preeti Rao', '7889900112'),
# ('Vikas Joshi', '6789001123'),
# ('Neha Kapoor', '7890011223'),
# ('Ravi Kumar', '7891122334'),
# ('Aditi Nair', '9900112233'),
# ('Suresh Babu', '9876501234'),
# ('Komal Aggarwal', '8765012345'),
# ('Varun Saxena', '7654321098'),
# ('Pooja Mishra', '6543210987'),
# ('Manoj Tiwari', '5432109876'),
# ('Nikita Sharma', '4321098765'),
# ('Ajay Dubey', '3210987654'),
# ('Ritika Chawla', '2109876543'),
# ('Arjun Das', '1098765432'),
# ('Shalini Yadav', '9988776654'),
# ('Kavita Reddy', '8877665543'),
# ('Deepak Soni', '7766554432'),
# ('Gaurav Khanna', '6655443321'),
# ('Ishita Roy', '5544332210'),
# ('Rajiv Ranjan', '4433221109');

def leftRotate(arr, n, k):
        r=arr[k:]
        r=r[::-1]
        arr=arr[:k]
        arr=arr[::-1]
        arr.extend(r)
        arr=arr[::-1]
        print(arr)
arr=[1,2,3,4,5]
leftRotate(arr,5,3)