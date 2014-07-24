from math import sqrt,pow

class Point:    
    def __init__(self,x,y):
        self.x=float(x)
        self.y=float(y)
        self.kept=1
    def __eq__(self,other):
        return self.x==other.x and self.y==other.y
    

def getDisBetPoiAndLin(p1,p2,p3):
    if p1==p2:
        print "starting and ending points are identical."
        return
    if p1.y==p2.y:
        return abs(p3.y-p1.y)
    a=1
    b=-(p2.x-p1.x)/(p2.y-p1.y)
    c=-p1.x+p1.y*(p2.x-p1.x)/(p2.y-p1.y)
    
    return abs((a*p3.x+b*p3.y+c)/sqrt(pow(a,2)+pow(b,2)))

def langSimplification(pointList,n,t):
    pointKept=[pointList[0]]
    if len(pointList)<=n:
        print "n is larger than the number of points "
        return
    final=len(pointList)
    end=n
    start=0
    current_ok=0
    kk=1
    while current_ok<final-1:
        #print kk
        #kk+=1
        while satisfy(pointList,start,end,t)==0 :
              end=end-1
                
        pointKept.append(pointList[end])
        current_ok=end
        start=end
        end=min(end+n,final-1)
        
        
    return pointKept

def satisfy(pointlist,start,end,t):
    tag=1
    if start+1==end:
        print "no intermedia points"        
        return tag
    #print start,end,'+++'
    for point in pointlist[start+1:end]:
        if getDisBetPoiAndLin(pointlist[start],pointlist[end],point)>t:
            tag=0
            break
    return tag