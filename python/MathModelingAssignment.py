from random import uniform,randint
from math import pi,sin,tan,cos,atan,sqrt
from numpy import arange



def newTheta(x,y,pointList,eta):
    sum_aver_x=0.0
    sum_aver_y=0.0
    for point in pointList:
        if (dis(x,point[0])**2+dis(y,point[1])**2)<1:
            sum_aver_x+=point[0]*cos(point[2])
            sum_aver_y+=point[1]*sin(point[2])
    aver_tan=sum_aver_y/sum_aver_x
    
    return atan(aver_tan)+uniform(-eta/2,+eta/2)


def dis(x1,x2):
    if abs(x1-x2)<4:
        return abs(x1-x2)
    else:
        return 5-abs(x1-x2)

v=0.03
res=[]
num=1
bug=0
for eta in arange(0,2*pi,0.1):
    
    num+=1
    pointList=[]
    pointList2=[]
    
    pointList2.append([-1,-1])
    for i in range(500):
        tem1=uniform(0,5)
        tem2=uniform(0,5)
        while [tem1,tem2] in pointList2:
            tem1=uniform(0,5)
            tem2=uniform(0,5)
        pointList.append([tem1,tem2,uniform(0,2*pi)])
        
    sum_x=0
    sum_y=0
    for k in range(500):
        sum_x+=cos(pointList[k][2])*v
        sum_y+=sin(pointList[k][2])*v
        
    aver_x=sum_x/500
    aver_y=sum_y/500
    
    module_old=sqrt(aver_x**2+aver_y**2)
    tag=0
    while tag==0:
        #print bug
        bug+=1
        tag=0
        for k in range(500):
           temp_index=randint(0,499)
           #print temp_index
           #print pointList[temp_index][0],pointList[temp_index][1]
           pointList[temp_index][0]=(pointList[temp_index][0]+v*cos(pointList[temp_index][2]))%5
           pointList[temp_index][1]=(pointList[temp_index][1]+v*sin(pointList[temp_index][2]))%5
           #print str(pointList[temp_index][2])+'before'
           pointList[temp_index][2]=newTheta(pointList[temp_index][0],pointList[temp_index][1],pointList,eta)
           #print str(pointList[temp_index][2])+'after'
           #print pointList[temp_index][0],pointList[temp_index][1]
            
        sum_x=0
        sum_y=0
        for k in range(500):
            sum_x+=cos(pointList[k][2])*v
            sum_y+=sin(pointList[k][2])*v
            
        aver_x=sum_x/500
        aver_y=sum_y/500
        #print aver_x,aver_y
        
        module=sqrt(aver_x**2+aver_y**2)
        
        if abs(module_old-module)<0.001:
            tag=1
        else:
            module_old=module
    if num==2:
        print num,eta,module
    res.append(module)
    break
