from random import uniform,randint
import numpy as np
from numpy import arange
import itertools

class Agent:
    # sex=1 male sex=2 female
    
    def __init__(self,id1,init_sugar,sex,vision,metabolism,age,x=-1,y=-1,isold=0):
        self.isold=isold
        self.id1=id1
        self.circle=0
        self.init_sugar=init_sugar
        self.cur_sugar=init_sugar
        self.sex=sex
        self.age=age
        self.lived=0
        self.metabolism=metabolism
        self.vision=vision
        self.x=x
        self.y=y
    def allowed_reproduction(self,D,F):
        return self.cur_sugar>=self.init_sugar and self.lived>=D and self.lived<=F
       
    def is_live(self):
        return self.lived<=age and self.cur_sugar>0
    def add_age(self):
        self.lived+=1
    def meta_and_collect(self,sugar):
        self.cur_sugar+=sugar
        self.cur_sugar=self.cur_sugar-self.metabolism
        
def aver_v(agents):
    temp=0
    for i in range(len(agents)):
        temp+=agents[i].vision
    return float(temp)/len(agents)


def aver_m(agents):
    temp=0
    for i in range(len(agents)):
        temp+=agents[i].metabolism
    return float(temp)/len(agents)
    
def move(agent,lattice,lattice_tag):
    vision1=agent.vision
    x=agent.x
    y=agent.y
   # print x,y
    position_list=[]
    sugar_list=[]
    for i in range(1,vision1+1):
        if lattice_tag[(x+i)%80,y]==0:
            position_list.append(((x+i)%80,y))
            sugar_list.append(lattice[(x+i)%80,y])
    for i in range(1,vision1+1):
        if lattice_tag[(x-i)%80,y]==0:
            position_list.append(((x-i)%80,y))
            sugar_list.append(lattice[(x-i)%80,y])
    for i in range(1,vision1+1):
        if lattice_tag[x,(y+i)%80]==0:
            position_list.append((x,(y+i)%80))
            sugar_list.append(lattice[x,(y+i)%80])
    for i in range(1,vision1+1):
        if lattice_tag[x,(y-i)%80]==0:
            position_list.append((x,(y-i)%80))
            sugar_list.append(lattice[x,(y-i)%80])
    if sugar_list==[]:
       return         
    (x1,y1)=position_list[sugar_list.index(max(sugar_list))]
    #print "move from %d %d to %d %d"%(x,y,x1,y1)
   # print "-----"
   # print x1,y1
   # print max(sugar_list),lattice[x1,y1]
    agent.y=y1
    agent.cur_sugar+=lattice[x1,y1]
   # print agent.cur_sugar
    agent.cur_sugar-=agent.metabolism
   # print agent.cur_sugar
    lattice_tag[x,y]=0
    lattice_tag[x1,y1]=agent.id1
    
    
def allowed_reproduction(agent,min_circle,max_circle):
    return agent.lived>=min_circle and agent.lived<=max_circle and agent.cur_sugar>=agent.init_sugar


def index_by_id(agents,id1):
    res=-1
    for i in range(len(agents)):
        if agents[i].id1==id1:
            res=i
    if res==-1:
        return -1
    return agents[i]
        


def getPartner(agent,agents,num,min_circle,max_circle):
    
    x=agent.x
    y=agent.y
    
    if num==1:
        if lattice_tag[(x+1)%80,y]!=0:
            agent_temp=index_by_id(agents,lattice_tag[(x+1)%80,y])
            if agent_temp!=-1 and agent_temp.sex!=agent.sex and allowed_reproduction(agent_temp,min_circle,max_circle):
                 return agent_temp
    
    if num==2:
        if lattice_tag[(x-1)%80,y]!=0:
            agent_temp=index_by_id(agents,lattice_tag[(x-1)%80,y])
            if agent_temp!=-1 and agent_temp.sex!=agent.sex and allowed_reproduction(agent_temp,min_circle,max_circle):
                   return agent_temp
        
    if num==3:
        if lattice_tag[x,(y-1)%80]!=0:
            agent_temp=index_by_id(agents,lattice_tag[x,(y-1)%80])
            if agent_temp!=-1 and agent_temp.sex!=agent.sex and allowed_reproduction(agent_temp,min_circle,max_circle):
                return agent_temp
        
    if num==4:
        if lattice_tag[x,(y+1)%80]!=0:
            agent_temp=index_by_id(agents,lattice_tag[x,(y+1)%80])
            if agent_temp!=-1 and agent_temp.sex!=agent.sex and allowed_reproduction(agent_temp,min_circle,max_circle):
               return agent_temp
    
    return -1

def reproduce(agent,agent_part,agents,lattice_tag,idd):
    
    if availableSite(agent,lattice_tag)!=-1:
        site=availableSite(agent,lattice_tag)
        temp_x=site[0]
        temp_y=site[1]
        
        init_sugar=agent.init_sugar/2+agent_part.init_sugar/2
        
        agent.cur_sugar-=agent.init_sugar/2
        agent_part.cur_sugar-=agent_part.init_sugar/2
        
        sex=randint(1,2)
        if randint(1,2)==1:
            vision=agent.vision
        else:
            vision=agent_part.vision
        if randint(1,2)==1:
            metabolism=agent.metabolism
        else:
            metabolism=agent_part.metabolism
        
        age=randint(60,100)
        
        agents.append(Agent(idd,init_sugar,sex,vision,metabolism,age,x=temp_x,y=temp_y))
        lattice_tag[temp_x,temp_y]=idd
        return 1
    elif availableSite(agent_part,lattice_tag)!=-1:
        site=availableSite(agent_part,lattice_tag)
        temp_x=site[0]
        temp_y=site[1]
        
        id1=idd+1
        init_sugar=agent.init_sugar/2+agent_part.init_sugar/2
        sex=randint(1,2)
        if randint(1,2)==1:
            vision=agent.vision
        else:
            vision=agent_part.vision
        if randint(1,2)==1:
            metabolism=agent.metabolism
        else:
            metabolism=agent_part.metabolism
        age=randint(60,100)
        
        agents.append(Agent(idd,init_sugar,sex,vision,metabolism,age,x=temp_x,y=temp_y))
        lattice_tag[temp_x,temp_y]=idd
        return 1
        
    else:
        return -1
        

def availableSite(agent,lattice_tag):
    x=agent.x
    y=agent.y
    
    li=[]
    if lattice_tag[(x+1)%80,y]==0:
        li.append(((x+1)%80,y))
        
    if lattice_tag[(x-1)%80,y]==0:
        li.append(((x-1)%80,y))
        
    if lattice_tag[x,(y+1)%80]==0:
        li.append((x,(y+1)%80))
        
    if lattice_tag[x,(y-1)%80]==0:
        li.append((x,(y-1)%80))
    
    if li==[]:
        return -1

    kkk=randint(0,len(li)-1)
    
    
    #print li[kkk][0],li[kkk][1]
    return li[kkk]
    
    #### Model setting up

# initialize the sugar land 

# parameters
Max_sugar=40
Min_sugar=0
P_init=1000
min_reproduce=5
max_reproduce=70
# 1,2,3,4,5,6 of vision and the values 1,2,3,4 of metabolism
#n age uniformly distributed between 60 and 100 cycles
#an initial sugar endowment picked uniformly at random from the range [10, 30]
agents=[]
lattice=np.zeros((80,80))

for i in range(80):
    for j in range(80):
        lattice[i,j]=round(40*math.exp((-(i-20)**2-(j-20)**2)/(2*25*8)))

for i in range(80):
    for j in range(80):
        lattice[i,j]+=round(40*math.exp((-(i-60)**2-(j-60)**2)/(2*25*8)))

    
lattice_tag=np.zeros((80,80)) # indicate if the position is occupied. 
lattice_tag2=np.zeros((80,80))

location_list=[(-1,-1)]
id1=1
for i in range(P_init):
    init_sugar=randint(10,30)
    sex=randint(1,2)
    vision=randint(1,6)
    metabolism=randint(1,4)
    age=randint(60,100)
    temp_x=-1
    temp_y=-1
    if (temp_x,temp_y) in location_list:
        temp_x=randint(0,79)
        temp_y=randint(0,79)
        
    location_list.append((temp_x,temp_y))
    
    agents.append(Agent(id1,init_sugar,sex,vision,metabolism,age,x=temp_x,y=temp_y,isold=1))
    lattice_tag[temp_x,temp_y]=id1
    lattice_tag2[temp_x,temp_y]=sex
    id1+=1
    
    tag=0
circle=1
population=[]
aver_vision=[]
aver_metabolism=[]
dead_wealth=[]
#average value of the vision and of metabolism
population.append(P_init)

while tag==0 and circle<=4000:
    print circle,len(agents)
    if len(agents)==1:
        print "all dead"
        break
        
    for agen in agents:
        if not agen.is_live():
            dead_wealth.append(agen.cur_sugar)
            lattice_tag[agen.x,agen.y]=0
            print "too old or too hangary"
    agents=[agen for agen in agents if agen.is_live()]
            
    for i in range(len(agents)):
        sele=randint(0,len(agents)-1)
        #print sele,len(agents)
        if agents[sele].circle<circle:
            #agents[sele].lived+=1
            agents[sele].circle=circle
            
        
        if agents[sele].is_live():
            move(agents[sele],lattice,lattice_tag)
            if agents[sele].is_live():
                if agents[sele].allowed_reproduction(min_reproduce,max_reproduce):
                      for num in range(1,5):
                            agent_part=getPartner(agents[sele],agents,num,min_reproduce,max_reproduce)
                            if agent_part!=-1:
                                tee=reproduce(agents[sele],agent_part,agents,lattice_tag,id1)
                                
                                if tee!=-1:
                                    id1+=1
                                    print "new borth"+" "+str(agents[sele].isold)+" "+str(agent_part.isold)+" "+str(agent_part.id1)
                            
                      
            #else:
            #    dead_wealth.append(agents[sele].cur_sugar)
            #    lattice_tag[agents[sele].x,agents[sele].y]=0
            #    del agents[sele]
            #    print "too hungary"
        #else:
        #   dead_wealth.append(agents[sele].cur_sugar)
        #    lattice_tag[agents[sele].x,agents[sele].y]=0
        #    del agents[sele]
        #    print "too old"
                
    circle+=1    
    population.append(len(agents))
    aver_vision.append(aver_v(agents))
    aver_metabolism.append(aver_m(agents))
    
    # add one sugar on each site of the lattice
    for i in range(80):
        for j in range(80):
           lattice[i,j]=min(lattice[i,j]+1,45)
    for agen in agents:
        agen.lived+=1
    