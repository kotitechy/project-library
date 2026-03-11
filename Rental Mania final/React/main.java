import java.io.*;
import java.util.*;

public class main {
    static int min(int a ,int b , int  c){
        if(a<=b && a<=c) return a;
        else if(b<=a && b<=c) return b;
        else return c;
    }
    static boolean hor(arr[x][y],int x,int y){

    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y = sc.nextInt();
        int arr[][] = new int[x][y];
        int dp[][] = new int[x][y];
        boolean f=false;
        
        for(int i=0;i<x;i++){
        for(int j=0;j<y;j++){
            arr[i][j] = sc.nextInt();
        }
        }
        for(int i=0;i<x;i++){
        for(int j=0;j<y;j++){
            if(i==0 || j==0) dp[i][j] = arr[i][j];
        }
        }
        for(int i=0;i<x;i++){
        for(int j=0;j<y;j++){
            if(arr[i][j]==1){
                int min = min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
                dp[i][j] = min+1;
            }
        }
        }
        int maxi=-123467;
        for(int i=0;i<x;i++){
        for(int j=0;j<y;j++){
            if(arr[i][j]>max){
                max = arr[i][j];
                }
        }
        }
        System.out.println(maxi);
    }
}