from math import inf

def validate_password(password):
    
    if len(password)<6:
        pwreason = ('password must be greater than or equal to 6 characters')
        return '',pwreason
    
    if len(password)>16:
        pwreason = ('password must be less than or equal to 16 characters')
        return '',pwreason
    return password,''

def MinCapColg(ColgDict):
    MinCapacity = ()
    MinValue = inf
    for collage in ColgDict.items():
        if collage[1][0]<MinValue:
            MinValue = collage[1][0]
            MinCapacity = collage
    return MinCapacity
      
def StudentDistribution(no_of_groups, student_list, college_list, distribute_later):
    """Distributes the students according to there desires. The list should be sorted for greatest to smallest mark

    Args:
        student_list (list): list of lists of students with their desires and mark
        college_list (list): list of lists of colleges with their capacities
        distribute_later (list): list of student ids with no desires

    Returns:
        tuple: list & dict...The first for the students and their accepted desire, The second for the current capacities of colleges 
    """
    CollegeCapacityDict={}
    AcceptedStudents = []
    for college in college_list:
        CollegeCapacityDict[str(college[0])]=[0, college[1], 0]

    for student in student_list:
        for DsrCntr in range(1,8):
            DesireKey = str(student[DsrCntr])
            CollegeCapacity = CollegeCapacityDict[DesireKey]
            if CollegeCapacity[0] < CollegeCapacity[1]:
                CollegeCapacityDict[DesireKey][0]+=1
                CollegeCapacityDict[DesireKey][2]=student[8]
                AcceptedStudents.append((student[0],student[DsrCntr]))
                break
            elif student[8]==CollegeCapacityDict[DesireKey][2]:
                CollegeCapacityDict[DesireKey][0]+=1
                CollegeCapacityDict[DesireKey][2]=student[8]
                AcceptedStudents.append((student[0],student[DsrCntr]))
                break
    
    #Distribute students that didn't fill there desires to collages
    for student in distribute_later:
        MinCapList = MinCapColg(CollegeCapacityDict)
        if MinCapList[1][0] < MinCapList[1][1]:
            MinCapList[1][0]+=1
            AcceptedStudents.append((student,int(MinCapList[0])))
        else:
            break
    
    return (AcceptedStudents, CollegeCapacityDict)